import { type } from "os";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Posttag } from "./Posttag";

@Entity()
export class Tag {
    @PrimaryColumn({ type: 'int' })
    id: number;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'varchar' })
    category: string;

    @Column({ type: 'int' })
    categoryId: number;

    // foreign key
    // tag <-> postTag 1:n
    @OneToMany((type) => Posttag, (postTag) => postTag.tag, {onDelete: 'CASCADE'})
    postTags: Posttag[];
}