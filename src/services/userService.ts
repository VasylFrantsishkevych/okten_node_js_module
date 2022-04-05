import bcrypt from 'bcrypt';

import { userRepository } from '../repositories';
import { IUser } from '../entity/user';
import { config } from '../config/config';
import { IPaginationResponse } from '../interfaces/paginationResponse.interface';

class UserService {
    public async createUser(user: IUser): Promise<IUser> {
        const { password } = user;

        const hashedPassword = await this._hashPassword(password);
        const dataToSave = { ...user, password: hashedPassword };

        return userRepository.createUser(dataToSave);
    }

    // Обновлення даних юзера
    public async updateUser(id: number, obj: Partial<IUser>): Promise<object | undefined> {
        if (obj.password) {
            obj.password = await this._hashPassword(obj.password);
        }
        return userRepository.updateUser(id, obj);
    }

    public async getUserByEmail(email: string): Promise<IUser | undefined> {
        return userRepository.getUserByEmail(email);
    }

    public async getAllUsers(): Promise<IUser[]> {
        return userRepository.getAllUsers();
    }

    public async getUserPagination(filterObject: IUser, page: number, perPage: number): Promise<IPaginationResponse<IUser>> {
        return userRepository.getUserPagination(filterObject, perPage, page);
    }

    public async compareUserPassword(password: string, hash: string): Promise<void | Error> {
        const isPasswordUnique = await bcrypt.compare(password, hash);

        if (!isPasswordUnique) {
            throw new Error('User not exists');
        }
    }

    private async _hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, Number(config.USER_SALT_ROUNDS));
    }
}

export const userService = new UserService();
