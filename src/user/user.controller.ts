/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { UpdateAddressDto, UpdateProfileDto } from 'src/common/dto/user.dto';
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

  @Patch('address')
  async updateAddress(
    @Request() req: JwtTokenPayload,
    @Body() updateAddressDto: UpdateAddressDto,
    @Res() res: Response,
  ) {
    return this.userService.updateAddress(req.user.uid, updateAddressDto, res);
  }

  @Post('address')
  async addAddress(
    @Request() req: JwtTokenPayload,
    @Body() addAddressDto: UpdateAddressDto,
    @Res() res: Response,
  ) {
    return this.userService.addAddress(req.user.uid, addAddressDto, res);
  }

  @Delete('address/:id')
  async deleteAddress(
    @Request() req: JwtTokenPayload,
    @Res() res: Response,
    @Param('id') id: number,
  ) {
    return this.userService.deleteAddress(req.user.uid, id, res);
  }
}
