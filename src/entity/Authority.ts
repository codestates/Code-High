import { Check, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Menu } from "./Menu";
import { User } from "./User";

@Entity()
export class Authority {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column({ type: 'varchar'})
    name: string;

    // foreign key
    // authoritys <-> user 1:n
    @OneToMany((type) => User, (user) => user.authority, {onDelete: 'CASCADE'})
    user:User[];

    // authoritys <-> menu 1:n
    @OneToMany((type) => Menu, (menu) => menu.authority, {onDelete: 'CASCADE'})
    menu:Menu[];
}