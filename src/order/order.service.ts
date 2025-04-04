/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Order } from 'src/common/entity/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async getAllOrders(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    const orders = await this.orderRepository.findAndCount({
      take: limit,
      skip: offset,
    });

    if (!orders) throw new NotFoundException('No orders found!');

    return orders;
  }

  async createOrder(order: Order) {
    const newOrder = this.orderRepository.create(order);

    return await this.orderRepository.save(newOrder);
  }

  async getOrderById(id: number) {
    const order = await this.orderRepository.findOne({ where: { id } });

    if (!order) throw new NotFoundException('Order not found!');

    return order;
  }
}
