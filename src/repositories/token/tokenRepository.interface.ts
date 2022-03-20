import { IToken } from '../../entity/token';
import { ITokenDataToSave } from '../../interfaces';

export interface ITokenRepository {
    createToken(token: ITokenDataToSave): Promise<IToken>;
    findTokenByUserId(userId: number): Promise<IToken | undefined>;
}
