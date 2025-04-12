/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class CreateReturnDto {
  @IsNotEmpty()
  @IsNumberString()
  orderId: number;

  @IsNotEmpty()
  @IsString()
  productItemId: string;
}

export class UpdateReturnDto {
  @IsNotEmpty()
  @IsString()
  status: string;

  @IsNotEmpty()
  @IsString()
  trackingStatus: string;
}
