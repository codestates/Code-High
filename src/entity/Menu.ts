import { type } from "os";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, BaseEntity } from "typeorm";
import { Authority } from "./Authority";

@Entity()
export class Menu extends BaseEntity {
    @PrimaryColumn({ type: 'int' })
    id: number;

    @Column({ type: 'int' })
    authorityId: number;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'varchar' })
    url: string;

    // foreign key
    // menu <-> authoritys n:1
    @ManyToOne((type) => Authority, (authority) => authority.menus)
    authority: Authority;
}