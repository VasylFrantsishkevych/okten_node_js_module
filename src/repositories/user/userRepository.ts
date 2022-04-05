import { EntityRepository, getManager, Repository } from 'typeorm';

import { IUser, User } from '../../entity/user';
import { IUserRepository } from './userRepository.interface';
import { IPaginationResponse } from '../../interfaces/paginationResponse.interface';

@EntityRepository(User)
class UserRepository extends Repository<User> implements IUserRepository {
    public async createUser(user: IUser): Promise<IUser> {
        return getManager().getRepository(User).save(user);
    }

    public async getAllUsers(): Promise<IUser[]> {
        return getManager().getRepository(User).find();
    }

    public async updateUser(id: number, user: Partial<IUser>): Promise<object> {
        return getManager().getRepository(User).update({ id }, user);
    }

    public async getUserByEmail(email: string): Promise<IUser | undefined> {
        return getManager().getRepository(User)
            .createQueryBuilder('user')
            .where('user.email = :email', { email })
            .andWhere('user.deletedAt IS NULL')
            .getOne();
    }

    // Знаходимо юзерів та їх кількість
    public async getUserPagination(
        searchObject: Partial<IUser> = {},
        limit: number,
        page: number = 1,
    ): Promise<IPaginationResponse<IUser>> {
        const skip = limit * (page - 1);
        const [users, itemCount] = await getManager().getRepository(User)
            .findAndCount({ where: searchObject, skip, take: limit });

        return {
            page,
            perPage: limit,
            itemCount,
            data: users,
        };
    }
}

export const userRepository = new UserRepository();
