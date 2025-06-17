import { InputType, Field, ObjectType, Int } from '@nestjs/graphql';
import { IsEmail, IsString, IsOptional, MinLength } from 'class-validator';

@InputType()
export class UpdateProfileInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString({ message: 'Nome deve ser uma string' })
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsEmail({}, { message: 'Email deve ter um formato válido' })
  email?: string;
}

@ObjectType()
export class RoleCount {
  @Field()
  role: string;

  @Field(() => Int)
  count: number;
}

@ObjectType()
export class UserStatsResponse {
  @Field(() => Int)
  totalUsers: number;

  @Field(() => [RoleCount])
  usersByRole: RoleCount[];

  @Field(() => Int)
  activeTokens: number;
}
