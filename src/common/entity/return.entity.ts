/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum ReturnStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
}

export enum ReturnTrackingStatus {
  PENDING = 'pending',
  PICKED = 'picked',
  PROCESSING = 'processing',
  DECLINED = 'declined',
  REFUNDED = 'refunded',
}

@Entity()
export class Return {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  uid: string;

  @Column({
    type: 'integer',
    nullable: false,
  })
  orderId: number;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  productItemId: string;

  @Column({
    type: 'enum',
    enum: ReturnStatus,
    default: ReturnStatus.PENDING,
  })
  status: string;

  @Column({
    type: 'enum',
    enum: ReturnTrackingStatus,
    default: ReturnTrackingStatus.PENDING,
  })
  trackingStatus: string;
}
