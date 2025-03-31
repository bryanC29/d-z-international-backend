/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

@Injectable()
export class ReturnService {
  getReturns() {
    return 'This action returns all returns';
  }

  updateReturn(id: number) {
    return `This action updates a #${id} return`;
  }
}
