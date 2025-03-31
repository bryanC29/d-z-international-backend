/* eslint-disable prettier/prettier */
import { Controller, Get, Param, Patch } from '@nestjs/common';
import { ReturnService } from './return.service';

@Controller('return')
export class ReturnController {
  constructor(private readonly returnService: ReturnService) {}

  @Get()
  getReturns() {
    return this.returnService.getReturns();
  }

  @Patch(':id')
  updateReturn(@Param('id') id: number) {
    return this.returnService.updateReturn(id);
  }
}
