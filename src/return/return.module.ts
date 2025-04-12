import { Module } from '@nestjs/common';
import { ReturnController } from './return.controller';
import { ReturnService } from './return.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Return } from 'src/common/entity/return.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/common/schema/user.schema';
import { Order } from 'src/common/entity/order.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Return, Order]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [ReturnController],
  providers: [ReturnService],
})
export class ReturnModule {}
