/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { UpdateProfileDto } from 'src/common/dto/user.dto';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch(':uid')
  async update(
    @Param('uid') uid: string,
    @Body() updateProfileDto: UpdateProfileDto,
    @Res() res: Response,
  ) {
    return this.userService.updateUser(uid, updateProfileDto, res);
  }

  @Delete()
  async softDelete(@Body() uid: string, @Res() res: Response) {
    return this.userService.softDeleteUser(uid, res);
  }
}
