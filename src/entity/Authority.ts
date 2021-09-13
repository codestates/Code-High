import { Check, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Authority {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varcher')
    name: string;

    @OneToOne(
        () => User, 
        user => user.authority)
    user:User;
}