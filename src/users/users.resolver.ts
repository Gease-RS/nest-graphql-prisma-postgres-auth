import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../auth/dto/auth.dto';
import { UpdateProfileInput, UserStatsResponse } from './dto/users.dto';
import { CurrentUser } from 'src/auth/decorators/current-user-decorator';

@Resolver(() => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => [User])
  @UseGuards(JwtAuthGuard)
  async users(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Query(() => User)
  @UseGuards(JwtAuthGuard)
  async user(@Args('id') id: string): Promise<User> {
    return this.usersService.findById(id);
  }

  @Query(() => User)
  @UseGuards(JwtAuthGuard)
  async profile(@CurrentUser() user: User): Promise<User> {
    return this.usersService.findById(user.id);
  }

  @Mutation(() => User)
  @UseGuards(JwtAuthGuard)
  async updateProfile(
    @CurrentUser() user: User,
    @Args('input') updateProfileInput: UpdateProfileInput,
  ): Promise<User> {
    return this.usersService.updateProfile(user.id, updateProfileInput);
  }

  @Mutation(() => String)
  @UseGuards(JwtAuthGuard)
  async deleteAccount(@CurrentUser() user: User): Promise<string> {
    const result = await this.usersService.deleteUser(user.id);
    return result.message;
  }

  @Query(() => UserStatsResponse)
  @UseGuards(JwtAuthGuard)
  async userStats(@CurrentUser() user: User): Promise<UserStatsResponse> {
    // Only allow admins to see stats
    if (user.role !== 'ADMIN') {
      throw new Error('Acesso negado: apenas administradores podem ver estatísticas');
    }
    return this.usersService.getUserStats();
  }

  /**
   * Type '{ totalUsers: number; usersByRole: (Prisma.PickEnumerable<Prisma.UserGroupByOutputType, "role"[]> & { _count: { role: number; }; })[]; activeTokens: number; }' is not assignable to type 'UserStatsResponse'.
  Types of property 'usersByRole' are incompatible.
    Type '(PickEnumerable<UserGroupByOutputType, "role"[]> & { _count: { role: number; }; })[]' is not assignable to type 'RoleCount[]'.
      Type 'PickEnumerable<UserGroupByOutputType, "role"[]> & { _count: { role: number; }; }' is not assignable to type 'RoleCount'.
        Types of property '_count' are incompatible.
          Type '{ role: number; }' is not assignable to type 'number'.ts(2322)
   */
}