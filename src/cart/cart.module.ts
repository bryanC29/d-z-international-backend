import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/common/schema/user.schema';
import { Product, ProductSchema } from 'src/common/schema/product.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from 'src/common/entity/orderItem.entity';
import { Order } from 'src/common/entity/order.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Product.name, schema: ProductSchema },
    ]),
    TypeOrmModule.forFeature([Order, OrderItem]),
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
