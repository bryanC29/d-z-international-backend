import { Module } from '@nestjs/common';
import { ReturnController } from './return.controller';
import { ReturnService } from './return.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Return } from 'src/common/entity/return.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Return])],
  controllers: [ReturnController],
  providers: [ReturnService],
})
export class ReturnModule {}
