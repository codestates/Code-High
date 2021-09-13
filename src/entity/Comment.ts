import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Comment {
    @PrimaryColumn()
    id: number;

    @Column()
    content: string;

    @Column()
    userId: number;

    @Column()
    postId: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}