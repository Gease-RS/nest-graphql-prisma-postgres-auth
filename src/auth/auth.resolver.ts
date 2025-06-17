import { Resolver, Mutation, Args, Context, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import {
  LoginInput,
  RegisterInput,
  AuthResponse,
  RefreshResponse,
  User,
} from './dto/auth.dto';
import { CurrentUser } from './decorators/current-user-decorator';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => AuthResponse)
  @Throttle({ short: { ttl: 1000, limit: 3 } }) // 3 requests per second
  async register(
    @Args('input') registerInput: RegisterInput,
    @Context() context: any,
  ): Promise<AuthResponse> {
    const result = await this.authService.register(registerInput);

    // Set refresh token as httpOnly cookie
    context.res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: '/',
    });

    return {
      accessToken: result.accessToken,
      user: result.user,
    };
  }

  @Mutation(() => AuthResponse)
  @Throttle({ short: { ttl: 1000, limit: 3 } }) // 3 requests per second
  async login(
    @Args('input') loginInput: LoginInput,
    @Context() context: any,
  ): Promise<AuthResponse> {
    const result = await this.authService.login(loginInput);

    // Set refresh token as httpOnly cookie
    context.res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: '/',
    });

    return {
      accessToken: result.accessToken,
      user: result.user,
    };
  }

  @Mutation(() => RefreshResponse)
  @Throttle({ medium: { ttl: 10000, limit: 10 } }) // 10 requests per 10 seconds
  async refreshToken(@Context() context: any): Promise<RefreshResponse> {
    const refreshToken = context.req.cookies?.refreshToken;
    const result = await this.authService.refreshToken(refreshToken);

    // Set new refresh token as httpOnly cookie
    context.res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: '/',
    });

    return {
      accessToken: result.accessToken,
    };
  }

  @Mutation(() => String)
  async logout(@Context() context: any): Promise<string> {
    const refreshToken = context.req.cookies?.refreshToken;
    await this.authService.logout(refreshToken);

    // Clear refresh token cookie
    context.res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    });

    return 'Logout realizado com sucesso';
  }

  @Mutation(() => String)
  @UseGuards(JwtAuthGuard)
  async logoutAll(
    @CurrentUser() user: User,
    @Context() context: any,
  ): Promise<string> {
    await this.authService.logoutAll(user.id);

    // Clear refresh token cookie
    context.res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    });

    return 'Logout de todos os dispositivos realizado com sucesso';
  }

  @Query(() => User)
  @UseGuards(JwtAuthGuard)
  async me(@CurrentUser() user: User): Promise<User> {
    return user;
  }
}