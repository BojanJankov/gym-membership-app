import { IsNumber, IsString } from 'class-validator';

export class CreateMembershipDto {
  @IsString()
  startDate: string;

  @IsString()
  expireDate: string;

  @IsString()
  paymentStatus: 'PAID' | 'PENDING';

  @IsString()
  userId: string;

  @IsNumber()
  planId: number;
}
