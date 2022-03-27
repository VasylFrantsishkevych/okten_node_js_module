import { IUser } from '../../entity/user.entity';

export interface IUserRepository {
    createUser(user: IUser): Promise<IUser>;
    getUserByEmail(email: string): Promise<IUser | undefined>;
    getAllUsers(): Promise<IUser[]>;
}
