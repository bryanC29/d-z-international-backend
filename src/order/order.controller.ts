/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from 'src/common/entity/order.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  getOrders(@Query() paginationDto: PaginationDto) {
    return this.orderService.getAllOrders(paginationDto);
  }

  @Post()
  createOrder(@Body() order: Order) {
    return this.orderService.createOrder(order);
  }

  @Get(':id')
  getOrderById(@Param('id') id: number) {
    return this.orderService.getOrderById(id);
  }
}
