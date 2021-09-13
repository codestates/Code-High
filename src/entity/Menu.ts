import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Menu {
    @PrimaryColumn()
    id: number;

    @Column()
    authorityId: number;

    @Column()
    name: string;

    @Column()
    url: string;
}