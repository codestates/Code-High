import { Check, Column, Entity, OneToMany, PrimaryGeneratedColumn, BaseEntity } from "typeorm";
import { Menu } from "./Menu";
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

    // authoritys <-> menu 1:n
    @OneToMany((type) => Menu, (menu) => menu.authority, {onDelete: 'CASCADE'})
    menus: Menu[];
}