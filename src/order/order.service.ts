/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/common/entity/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async getAllOrders() {
    const orders = await this.orderRepository.find();

    if (!orders) throw new NotFoundException('No orders found!');

    return orders;
  }

  async createOrder(order: any) {
    const newOrder = this.orderRepository.create(order);

    return await this.orderRepository.save(newOrder);
  }

  async getOrderById(id: number) {
    const order = await this.orderRepository.findOne({ where: { id } });

    if (!order) throw new NotFoundException('Order not found!');

    return order;
  }
}
