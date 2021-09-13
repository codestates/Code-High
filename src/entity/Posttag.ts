import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Posttag {
    @PrimaryColumn()
    id: number;

    @Column()
    tagId: number;

    @Column()
    postId: number;
}