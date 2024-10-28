import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Membership {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  startDate: string;

  @Column()
  expireDate: string;

  @Column()
  paymentStatus: 'PAID' | 'PENDING';
}
