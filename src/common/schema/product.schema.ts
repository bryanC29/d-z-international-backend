/* eslint-disable prettier/prettier */
import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@ObjectType()
@Schema()
export class Review {
  @Field({ nullable: true })
  @Prop({ required: true })
  uid: string;

  @Field({ nullable: true })
  @Prop({ required: true })
  comment: string;

  @Field(() => [String], { nullable: true })
  @Prop({ type: [String], required: false })
  media: string[];

  @Field({ nullable: true })
  @Prop({ required: true })
  rating: number;
}

@ObjectType()
@Schema()
export class Faq {
  @Field({ nullable: true })
  @Prop({ required: true })
  question: string;

  @Field({ nullable: true })
  @Prop({ required: true })
  uid: string;

  @Field({ nullable: true })
  @Prop({ required: true })
  answer: string;
}

@ObjectType()
@Schema()
export class Product {
  @Field()
  @Prop({ required: true })
  pid: string;

  @Field()
  @Prop({ required: true })
  category: string;

  @Field()
  @Prop({ required: true })
  name: string;

  @Field(() => [String])
  @Prop({ type: [String], required: true })
  media: string[];

  @Field()
  @Prop({ required: true })
  description: string;

  @Field()
  @Prop({ required: true })
  price: number;

  @Field()
  @Prop({ required: true })
  offer_price: number;

  @Field()
  @Prop({ required: true })
  details: string;

  @Field(() => [String])
  @Prop({ type: [String], required: true })
  gallery: string[];

  @Field(() => [String])
  @Prop({ type: [String], required: true })
  top_points: string[];

  @Field(() => [Review], { nullable: true })
  @Prop({ type: [Review], required: false })
  reviews: Review[];

  @Field(() => [Faq], { nullable: true })
  @Prop({ type: [Faq], required: false })
  faq: Faq[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
export const ReviewSchema = SchemaFactory.createForClass(Review);
export const FaqSchema = SchemaFactory.createForClass(Faq);
