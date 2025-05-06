/* eslint-disable prettier/prettier */
import { Transform } from 'class-transformer';
import {
  IsBooleanString,
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  Length,
} from 'class-validator';

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

export class UpdateAddressDto {
  @IsNotEmpty()
  line1: string;

  @IsNotEmpty()
  line2: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  state: string;

  @IsOptional()
  @Transform(({ value }) => (value ?? 'India') as string)
  country?: string = 'India';

  @IsNotEmpty()
  @IsNumberString()
  code: number;

  @IsNotEmpty()
  @IsNumberString()
  number: string;

  @IsNotEmpty()
  @IsIn(['work', 'home'])
  type: 'work' | 'home';

  @IsNotEmpty()
  @IsBooleanString()
  weekend_availability: boolean;

  @IsOptional()
  @IsNumberString()
  alternate_number?: string;
}
