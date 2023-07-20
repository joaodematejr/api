import { Role } from 'src/enums/role.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  id: number;
  @Column({
    length: 63,
  })
  name: string;

  @Column({
    length: 127,
    unique: true,
  })
  email: string;

  @Column({
    length: 127,
  })
  password: string;

  @Column({
    type: 'date',
    nullable: true,
  })
  birthday: Date;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updateAt: string;

  @Column({
    default: Role.User,
  })
  role: number;
}
