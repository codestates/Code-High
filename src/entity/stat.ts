import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';


@Entity()
export class Stat extends BaseEntity {

  @PrimaryColumn()
  date: Date
  
}