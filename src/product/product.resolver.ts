/* eslint-disable prettier/prettier */
import { Args, Query, Resolver } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { Product } from 'src/common/schema/product.schema';

@Resolver()
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query(() => [Product])
  async products(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Query(() => Product, { nullable: true })
  async product(@Args('uid') uid: string): Promise<Product | null> {
    return this.productService.findOneByUid(uid);
  }
}
