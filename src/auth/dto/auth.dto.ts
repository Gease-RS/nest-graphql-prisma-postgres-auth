import { InputType, Field, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';

@InputType()
export class LoginInput {
  @Field()
  @IsEmail({}, { message: 'Email deve ter um formato válido' })
  email: string;

  @Field()
  @IsString({ message: 'Senha deve ser uma string' })
  @MinLength(6, { message: 'Senha deve ter pelo menos 6 caracteres' })
  password: string;
}

@InputType()
export class RegisterInput {
  @Field()
  @IsEmail({}, { message: 'Email deve ter um formato válido' })
  email: string;

  @Field()
  @IsString({ message: 'Senha deve ser uma string' })
  @MinLength(6, { message: 'Senha deve ter pelo menos 6 caracteres' })
  password: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString({ message: 'Nome deve ser uma string' })
  name?: string;
}

@ObjectType()
export class AuthResponse {
  @Field()
  accessToken: string;

  @Field(() => User)
  user: User;
}

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  name?: string;

  @Field()
  role: string;

  @Field()
  createdAt: Date;
}

@ObjectType()
export class RefreshResponse {
  @Field()
  accessToken: string;
}