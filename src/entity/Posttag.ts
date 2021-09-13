import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Post } from "./Post";
import { Tag } from "./Tag";

@Entity()
export class Posttag {
    @PrimaryColumn({ type: 'int' })
    id: number;

    @Column({ type: 'int' })
    tagId: number;

    @Column({ type: 'int' })
    postId: number;

    // foreign key
    // postTag <-> post n:1
    @ManyToOne((type) => Post, (post) => post.postTag)
    @JoinColumn({ name: 'postId' })
    post:Post;

    // posttag <-> tag n:1
    @ManyToOne((type) => Tag, (tag) => tag.postTag)
    @JoinColumn({ name: 'tagId'})
    tag:Tag;
}