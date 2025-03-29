/* eslint-disable prettier/prettier */
import { Controller } from '@nestjs/common';
import { AdminService } from '../admin.service';

@Controller('coupons')
export class CouponsController {
  constructor(private readonly adminService: AdminService) {}
}
