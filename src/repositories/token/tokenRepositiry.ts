import { EntityRepository, getManager, Repository } from 'typeorm';

import { IToken, TokenEntity } from '../../entity/token.entity';
import { ITokenRepository } from './tokenRepository.interface';
import { ITokenDataToSave } from '../../interfaces/token.interface';

@EntityRepository(TokenEntity)
class TokenRepository extends Repository<TokenEntity> implements ITokenRepository {
    public async createToken(token: ITokenDataToSave): Promise<IToken> {
        return getManager().getRepository(TokenEntity).save(token);
    }

    public async findTokenByUserId(userId: number): Promise<IToken | undefined> {
        return getManager().getRepository(TokenEntity).findOne({ userId });
    }
}

export const tokenRepository = new TokenRepository();
