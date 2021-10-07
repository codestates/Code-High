import { type } from "os";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Post } from './Post';
import { User } from "./User";

@Entity()
export class Comment extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'int' })
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
    @ManyToOne((type) => User, (user) => user.comments, { onDelete: 'CASCADE' })
    user: User;

    @ManyToOne((type) => Post, (post) => post.comments, { onDelete: 'CASCADE' })
    post: Post;
}