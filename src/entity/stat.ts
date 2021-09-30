import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';


@Entity()
export class Stat extends BaseEntity {

  @PrimaryColumn()
  date: Date;

  @Column()
  postCount: number;

  @Column()
  commentCount: number;

  @Column()
  joinCount: number;

  @Column()
  visitCount: number;
}