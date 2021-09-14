import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Authority } from './Authority';
import { Comment } from "./Comment";
import { Post } from "./Post";



// BaseEntity 사용한 이유: save, remove 메소드 사용하기 위해서
@Entity()
export class User extends BaseEntity {

  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar'})
  name: string;

  @Column({ type: 'varchar'})
  phone: string;

  @Column({ type: 'varchar'})
  email: string;

  @Column({ type: 'varchar'})
  password: string;

  @Column({ type: 'varchar', nullable: true })
  image: string;

  @Column({ type: 'varchar'})
  loginType: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // foreign key
  // user <-> authoritys n:1
  @ManyToOne((type) => Authority, (authority) => authority.user)
  @JoinColumn({ name: 'authorityId' })
  authority: Authority;

  // user <-> post 1:n
  @OneToMany((type) => Post, (post) => post.user, {onDelete: 'CASCADE'})
  post:Post[];

  // user <-> comment 1:n
  @OneToMany((type) => Comment, (comment) => comment.user, {onDelete: 'CASCADE'})
  comment:Comment[];
}
