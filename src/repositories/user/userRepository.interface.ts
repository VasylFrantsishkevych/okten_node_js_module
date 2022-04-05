import { DeleteResult, UpdateResult } from 'typeorm';

import { IUser } from '../../entity';

export interface IUserRepository {
    getAllUsers(): Promise<IUser[]>;
    createUser(user: IUser): Promise<IUser>;
    getUserByEmail(email: string): Promise<IUser | undefined>;
    updateUser(id: number, password: string, email: string): Promise<UpdateResult>;
    deleteUser(id: number): Promise<DeleteResult>;
}
