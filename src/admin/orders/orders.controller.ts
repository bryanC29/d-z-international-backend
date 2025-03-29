/* eslint-disable prettier/prettier */
import { Controller, Get, Param, Put } from '@nestjs/common';
import { AdminService } from '../admin.service';

@Controller('admin/orders')
export class OrdersController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  getOrders() {
    return this.adminService.getAllOrders();
  }

  @Get(':id')
  getOrder(@Param('id') id: number) {
    return this.adminService.getOrderById(id);
  }

  @Put(':id')
  updateOrder(@Param('id') id: number) {
    return this.adminService.updateOrderById(id);
  }
}
