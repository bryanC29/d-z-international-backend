/* eslint-disable prettier/prettier */
import { Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { AdminService } from '../admin.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('admin/returns')
export class ReturnsController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  getReturns(@Query() paginationDto: PaginationDto) {
    return this.adminService.getAllReturns(paginationDto);
  }

  @Patch(':id')
  updateReturn(@Param('id') id: number) {
    return this.adminService.updateReturnById(id);
  }
}
