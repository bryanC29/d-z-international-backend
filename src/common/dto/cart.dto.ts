/* eslint-disable prettier/prettier */
import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class CartItemDto {
  @IsNotEmpty()
  @IsString()
  product_id: string;

  @IsNotEmpty()
  @IsNumberString()
  quantity: number;
}

export class EditCartItemDto {
  @IsOptional()
  @IsNumberString()
  quantity?: number;
}
