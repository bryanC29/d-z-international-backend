/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class Address {
  @Prop({ required: true })
  line1: string;

  @Prop()
  line2: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  state: string;

  @Prop({ required: true })
  country: string;

  @Prop({ required: true })
  code: number;

  @Prop({ required: true })
  number: string;

  @Prop()
  alternate_number: string;

  @Prop({ enum: ['home', 'work'], required: true })
  type: 'home' | 'work';

  @Prop()
  weekend_availability: boolean;
}

@Schema()
export class WishlistItem {
  @Prop({ required: true })
  product_id: string;
}

@Schema()
export class CartItem {
  @Prop({ required: true })
  product_id: string;

  @Prop({ required: true })
  quantity: number;
}

@Schema()
export class CouponUsed {
  @Prop({ required: true })
  coupon_id: string;
}

@Schema()
export class User {
  @Prop({ required: true })
  uid: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  contact_no: string;

  @Prop({ required: true })
  password: string;

  @Prop({ enum: ['user', 'admin'], required: true })
  role: 'user' | 'admin';

  @Prop()
  profile_url: string;

  @Prop({ required: true })
  dob: Date;

  @Prop({ required: true })
  address: string;

  @Prop({ type: [Address], required: true })
  addressDetails: Address[];

  @Prop({ type: [WishlistItem], required: false })
  wishlist: WishlistItem[];

  @Prop({ type: [CartItem], required: false })
  cart: CartItem[];

  @Prop({ type: [CouponUsed], required: false })
  coupons_used: CouponUsed[];
}

export const UserSchema = SchemaFactory.createForClass(User);
export const AddressSchema = SchemaFactory.createForClass(Address);
export const WishlistItemSchema = SchemaFactory.createForClass(WishlistItem);
export const CartItemSchema = SchemaFactory.createForClass(CartItem);
export const CouponUsedSchema = SchemaFactory.createForClass(CouponUsed);
