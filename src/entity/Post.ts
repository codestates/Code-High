import { type } from "os";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, UpdateDateColumn, BaseEntity } from "typeorm";
import { Posttag } from "./Posttag";
import { User } from "./User";

@Entity()
export class Post extends BaseEntity {
    @PrimaryColumn({ type: 'int' })
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

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    // foreign key
    // post <-> user n:1
    @ManyToOne((type) => User, (user) => user.posts)
    user: User;

    // post <-> postTag 1:n
    @OneToMany((type) => Posttag, (postTag) => postTag.post, {onDelete: 'CASCADE'})
    postTags: Posttag[];


}