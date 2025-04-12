/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Patch,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { UpdateProfileDto } from 'src/common/dto/user.dto';
import { JwtTokenPayload } from 'src/common/dto/payload.dto';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch()
  async update(
    @Request() req: JwtTokenPayload,
    @Body() updateProfileDto: UpdateProfileDto,
    @Res() res: Response,
  ) {
    return this.userService.updateUser(req.user.uid, updateProfileDto, res);
  }

  @Delete()
  async softDelete(@Res() res: Response, @Request() req: JwtTokenPayload) {
    return this.userService.softDeleteUser(req.user.uid, res);
  }
}
