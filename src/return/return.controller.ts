/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ReturnService } from './return.service';
import { JwtTokenPayload } from 'src/common/dto/payload.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { CreateReturnDto } from 'src/common/dto/return.dto';

@UseGuards(JwtAuthGuard)
@Controller('return')
export class ReturnController {
  constructor(private readonly returnService: ReturnService) {}

  @Get()
  getReturns(@Request() req: JwtTokenPayload) {
    return this.returnService.getReturns(req.user.uid);
  }

  @Post()
  createReturn(@Request() req: JwtTokenPayload, @Body() body: CreateReturnDto) {
    return this.returnService.createReturn(req.user.uid, body);
  }
}
