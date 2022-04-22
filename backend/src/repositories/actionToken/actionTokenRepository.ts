import { EntityRepository, getManager, Repository } from 'typeorm';

import { ActionToken, IActionToken, IActionTokenForSave } from '../../entity/actionToken';
import { IActionTokenRepository } from './actionTokenRepository.interface';

@EntityRepository(ActionToken)
class ActionTokenRepository extends Repository<ActionToken> implements IActionTokenRepository {
    // Зберагає токен в базу
    async saveActionToken(token: IActionTokenForSave): Promise<ActionToken> {
        return getManager().getRepository(ActionToken).save(token);
    }

    // Пошук токена в базі
    async findByParams(filterObject: Partial<IActionToken>): Promise<IActionToken | undefined> {
        return getManager().getRepository(ActionToken).findOne(filterObject);
    }

    // Видалення токена
    async deleteByParams(findObject: Partial<IActionToken>) {
        return getManager().getRepository(ActionToken).delete(findObject);
    }
}

export const actionTokenRepository = new ActionTokenRepository();
