import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
