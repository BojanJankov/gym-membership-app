import { User } from '../../auth/models/auth.model';
import { Plan } from '../../plans/models/plans.model';

export interface Membership {
  id: number;
  startDate: string;
  expireDate: string;
  paymentStatus: 'PAID' | 'PENDING';
  plan: Plan;
  user: User;
}

export interface MembershipReq {
  startDate: string;
  expireDate: string;
  paymentStatus: 'PAID' | 'PENDING';
  planId: number;
  userId: string;
}
