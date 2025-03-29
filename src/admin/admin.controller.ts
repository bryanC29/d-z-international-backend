/* eslint-disable prettier/prettier */
import { Controller, Post } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('notifications')
  sendNotifications() {
    return 'New Notification Sent';
  }
}
