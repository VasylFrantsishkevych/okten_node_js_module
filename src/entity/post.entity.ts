import {
    Column, Entity, JoinColumn, ManyToOne, OneToMany,
} from 'typeorm';

import { CommonFields, ICommonFields } from './commonFields';
import { User } from './user.entity';
import { config } from '../config';
import { IComment, Comment } from './comment.entity';

export interface IPost extends ICommonFields{
    title: string;
    text: string;
    userId: number;
    comments: IComment[];
}

@Entity('posts', { database: config.MYSQL_DATABASE_NAME })
export class Post extends CommonFields implements IPost {
    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        title: string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        text: string;

    @Column({
        type: 'int',
    })
        userId: number;

    @OneToMany(() => Comment, (comment) => comment.post)
        comments: Comment[];

    @ManyToOne(() => User, (user) => user.posts)
    @JoinColumn({ name: 'userId' })
        user: User;
}
