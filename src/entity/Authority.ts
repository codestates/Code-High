import { BaseEntity, Check, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Authority extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column({ type: 'varchar'})
    name: string;

    // foreign key
    // authoritys <-> user 1:n
    @OneToMany((type) => User, (user) => user.authority, {onDelete: 'CASCADE'})
    users: User[];
}