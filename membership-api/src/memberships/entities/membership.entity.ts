import { Plan } from 'src/plans/entities/plan.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @JoinColumn()
  @ManyToOne(() => Plan, (plan) => plan.memberships)
  plan: Plan;

  @JoinColumn()
  @ManyToOne(() => User, (user) => user.memberships)
  user: User;
}
