/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { AdminService } from '../admin.service';

@Controller('admin/products')
export class ProductsController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  createProduct(@Body() body: any) {
    return this.adminService.createProduct(body);
  }

  @Put(':id')
  updateProduct(@Param('id') id: number) {
    return this.adminService.updateProductById(id);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: number) {
    return this.adminService.deleteProductById(id);
  }
}
