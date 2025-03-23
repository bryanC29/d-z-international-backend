/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Param, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/common/schema/user.schema';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch(':uid')
  async update(
    @Param('uid') uid: string,
    @Body() updateData: Partial<User>,
  ): Promise<User | null> {
    return this.userService.updateUser(uid, updateData);
  }

  @Delete()
  async softDelete(@Body() uid: string): Promise<User | null> {
    return this.userService.softDeleteUser(uid);
  }
}
