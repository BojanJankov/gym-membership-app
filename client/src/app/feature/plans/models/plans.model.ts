import { Membership } from '../../memberships/models/memberships.model';

export interface Plan {
  id: number;
  name: string;
  fee: number;
  description: string;
  memberships: Membership[];
}

export interface PlanReq {
  name: string;
  fee: number;
  description: string;
}
