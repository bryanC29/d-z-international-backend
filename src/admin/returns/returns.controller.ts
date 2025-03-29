/* eslint-disable prettier/prettier */
import { Controller, Get, Param, Patch } from '@nestjs/common';
import { AdminService } from '../admin.service';

@Controller('admin/returns')
export class ReturnsController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  getReturns() {
    return this.adminService.getAllReturns();
  }

  @Patch(':id')
  updateReturn(@Param('id') id: number) {
    return this.adminService.updateReturnById(id);
  }
}
