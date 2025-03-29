/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { Model } from 'mongoose';
import { Order } from 'src/common/entity/order.entity';
import { Return } from 'src/common/entity/return.entity';
import { Product, ProductDocument } from 'src/common/schema/product.schema';
import { User, UserDocument } from 'src/common/schema/user.schema';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,

    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,

    @InjectRepository(Return)
    private readonly returnRepository: Repository<Return>,

    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async getAllReturns() {
    const returns = await this.returnRepository.find();

    if (!returns) {
      throw new NotFoundException('No returns found');
    }

    return returns;
  }

  async updateReturnById(id: number) {
    const returnItem = await this.returnRepository.findOne({ where: { id } });

    if (!returnItem) {
      throw new NotFoundException(`Return with id ${id} not found`);
    }

    return returnItem;
  }

  async createProduct(body: any) {
    const newProduct = await this.productModel.create(body);

    return newProduct;
  }

  updateProductById(id: number) {
    return `Update product with id ${id}`;
  }

  deleteProductById(id: number) {
    return `Delete product with id ${id}`;
  }

  async getAllOrders() {
    const orders = await this.orderRepository.find();

    if (!orders) {
      throw new NotFoundException('No orders found');
    }

    return orders;
  }

  async getOrderById(id: number) {
    const order = await this.orderRepository.findOne({ where: { id } });

    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }

    return order;
  }

  updateOrderById(id: number) {
    return `Update order ${id}`;
  }
}
