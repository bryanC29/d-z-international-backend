/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CartItemDto, EditCartItemDto } from 'src/common/dto/cart.dto';
import { User, UserDocument } from 'src/common/schema/user.schema';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async getCartItems(uid: string) {
    const user = await this.userModel.findOne({ uid: uid }).exec();
    if (!user) {
      throw new NotFoundException('Invalid credentials');
    }

    const cart = user.cart;
    return cart;
  }

  async addToCart(uid: string, body: CartItemDto) {
    const user = await this.userModel.findOne({ uid: uid }).exec();
    if (!user) {
      throw new NotFoundException('Invalid credentials');
    }
    user.cart.push(body);
    await user.save();
    return 'Item added to cart successfully';
  }

  async updateCart(uid: string, pid: string, body: EditCartItemDto) {
    const user = await this.userModel.findOne({ uid: uid }).exec();
    if (!user) {
      throw new NotFoundException('Invalid credentials');
    }

    const cartItem = user.cart.find((item) => item.product_id === pid);
    if (!cartItem) {
      throw new NotFoundException('Item not found in cart');
    }

    if (body.quantity !== undefined) {
      cartItem.quantity = body.quantity;
    }
    await user.save();
    return 'Cart updated successfully';
  }

  async removeFromCart(uid: string, id: string) {
    const user = await this.userModel.findOne({ uid: uid }).exec();
    if (!user) {
      throw new NotFoundException('Invalid credentials');
    }

    const cartItemIndex = user.cart.findIndex((item) => item.product_id === id);
    if (cartItemIndex === -1) {
      throw new NotFoundException('Item not found in cart');
    }

    user.cart.splice(cartItemIndex, 1);
    await user.save();
    return 'Item removed from cart successfully';
  }
}
