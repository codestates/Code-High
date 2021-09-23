import { type } from "os";
<<<<<<< HEAD
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Comment extends BaseEntity {
    @PrimaryColumn({ type: 'int' })
=======
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn({ type: 'int' })
>>>>>>> bf9e34929f7583cef3d244b86a9b56c1d0424c1b
    id: number;

    @Column({ type: 'varchar' })
    content: string;

    @Column({ type: 'int' })
    userId: number;

    @Column({ type: 'varchar'})
    userName: string;

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