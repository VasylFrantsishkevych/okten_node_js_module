import { IUser } from '../../entity/user';
import { IPaginationResponse } from '../../interfaces/paginationResponse.interface';

export interface IUserRepository {
    createUser(user: IUser): Promise<IUser>;
    updateUser(id: number, user: Partial<IUser>): Promise<object>
    getUserByEmail(email: string): Promise<IUser | undefined>;
    getAllUsers(): Promise<IUser[]>;
    getUserPagination(searchObject: Partial<IUser>, limit: number, page: number,): Promise<IPaginationResponse<IUser>>
}
