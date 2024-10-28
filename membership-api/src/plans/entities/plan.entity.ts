import { Membership } from 'src/memberships/entities/membership.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Plan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  fee: number;

  @Column()
  description: string;

  @OneToMany(() => Membership, (membership) => membership.plan)
  memberships: Membership[];
}
