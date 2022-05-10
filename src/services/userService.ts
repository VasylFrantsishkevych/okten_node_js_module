import bcrypt from 'bcrypt';
import { DeleteResult, UpdateResult } from 'typeorm';

import { IUser } from '../entity';
import { config } from '../config';
import { userRepository } from '../repositories';

class UserService {
    public async createUser(user: IUser): Promise<IUser> {
        const { password } = user;

        const hashedPassword = await this._hashPassword(password);
        const dataToSave = { ...user, password: hashedPassword };

        return userRepository.createUser(dataToSave);
    }

    public async getAllUsers(): Promise<IUser[]> {
        return userRepository.getAllUsers();
    }

    public async getUserByEmail(email: string): Promise<IUser | undefined> {
        return userRepository.getUserByEmail(email);
    }

    public async updateUser(id: string, password: string, email: string): Promise<UpdateResult> {
        return userRepository.updateUser(+id, password, email);
    }

    public async deleteUser(id: string): Promise<DeleteResult> {
        return userRepository.deleteUser(+id);
    }

    public async compareUserPasswords(password: string, hashPassword: string): Promise<void | Error> {
        const isPasswordUnique = await bcrypt.compare(password, hashPassword);

        if (!isPasswordUnique) {
            throw new Error('wrong email or password');
        }
    }

    private async _hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, Number(config.USER_SALT_ROUNDS));
    }
}

export const userService = new UserService();
