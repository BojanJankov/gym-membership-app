import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

Entity();
export class Trainer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  photo: string;

  @Column()
  age: number;

  @Column()
  expirience: number;

  @Column()
  phoneNumber: string;

  @Column()
  email: string;
}
