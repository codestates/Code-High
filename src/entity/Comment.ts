import { type } from "os";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Comment extends BaseEntity {
    @PrimaryColumn({ type: 'int' })
    id: number;

    @Column({ type: 'varchar' })
    content: string;

    @Column({ type: 'int' })
    userId: number;

    @Column({ type: 'int' })
    postId: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    // foreign key
    // comment <-> user n:1
    @ManyToOne((type) => User, (user) => user.comments)
    user: User;
}