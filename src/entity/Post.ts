import { type } from "os";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryColumn, UpdateDateColumn, BaseEntity, PrimaryGeneratedColumn } from "typeorm";
import { Tag } from './Tag';
import { Posttag } from "./Posttag";
import { User } from "./User";
import { Comment } from './Comment';

@Entity()
export class Post extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column({ type: 'varchar' })
    title: string;

    @Column({ type: 'varchar', length: 5000, nullable: true  })
    textContent: string;

    @Column({ type: 'varchar', length: 5000, nullable: true  })
    codeContent: string;

    @Column({ type: 'boolean' })
    secret: boolean;

    @Column({ type: 'int' })
    userId: number;

    @Column()
    viewCount: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    // foreign key
    // post <-> user n:1
    @ManyToOne((type) => User, (user) => user.posts, { onDelete: 'CASCADE' })
    user: User;

    // post <-> postTag 1:n
    @OneToMany((type) => Posttag, (postTag) => postTag.post, {cascade: true})
    postTags: Posttag[];

    @OneToMany((type) => Comment, (comment) => comment.post, {cascade: true})
    comments: Comment[];
}