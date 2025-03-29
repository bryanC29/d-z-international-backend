/* eslint-disable prettier/prettier */
import { Controller } from '@nestjs/common';
import { AdminService } from '../admin.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly adminService: AdminService) {}
}
