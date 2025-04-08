/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsOptional, Length } from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  uid?: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @Length(3, 20)
  name: string;

  @IsNotEmpty()
  number: string;

  @IsOptional()
  role?: string;
}

export class LoginUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class UpdatePasswordDto {
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  token: string;
}

export class UpdateProfileDto {
  @IsOptional()
  number?: string;

  @IsOptional()
  profile_url?: string;
}
