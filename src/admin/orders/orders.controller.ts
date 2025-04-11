/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Put, Query } from '@nestjs/common';
import { AdminService } from '../admin.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { UpdateOrderDto } from 'src/common/dto/order.dto';

@Controller('admin/orders')
export class OrdersController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  getOrders(@Query() paginationDto: PaginationDto) {
    return this.adminService.getAllOrders(paginationDto);
  }

  @Get(':id')
  getOrder(@Param('id') id: number) {
    return this.adminService.getOrderById(id);
  }

  @Put(':id')
  updateOrder(@Param('id') id: number, @Body() body: UpdateOrderDto) {
    return this.adminService.updateOrderById(id, body);
  }
}
