/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Return } from 'src/common/entity/return.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReturnService {
  constructor(
    @InjectRepository(Return)
    private readonly returnRepository: Repository<Return>,
  ) {}

  async getReturns() {
    const returns = await this.returnRepository.find();

    if (!returns) throw new NotFoundException('No returns found');

    return returns;
  }

  async updateReturn(id: number) {
    const returnItem = await this.returnRepository.findOne({ where: { id } });

    if (!returnItem)
      throw new NotFoundException(`Return with id ${id} not found`);

    return returnItem;
  }
}
