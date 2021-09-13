import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, OneToMany, OneToOne, JoinColumn} from "typeorm";
import {Authority} from './Authority';

// BaseEntity 사용한 이유: save, remove 메소드 사용하기 위해서
@Entity()
export class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  image: string;

  @Column()
  loginType: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // user <-> authoritys
  @OneToOne(() => Authority)
  @JoinColumn()
  authority: Authority;
}
