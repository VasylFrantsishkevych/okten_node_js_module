import {
    Column, Entity, JoinColumn, ManyToOne,
} from 'typeorm';

import { config } from '../config/config';
import { CommonFields, ICommonFields } from './commonFields';
import { ActionTokenType } from '../enums';
import { User } from './user';

export interface IActionToken extends ICommonFields {
    actionToken: string;
    type: ActionTokenType;
    userId: number;
}

export interface IActionTokenForSave {
    actionToken: string;
    type: ActionTokenType;
    userId: number;
}

@Entity('actiontokens', { database: config.MYSQL_DATABASE_NAME })
export class ActionToken extends CommonFields implements IActionToken {
    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,
    })
        actionToken: string;

    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,
    })
        type: ActionTokenType;

    @Column({
        type: 'int',
    })
        userId: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId' })
        user: User;
}
