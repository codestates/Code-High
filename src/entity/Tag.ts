import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Tag {
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    category: string;
}