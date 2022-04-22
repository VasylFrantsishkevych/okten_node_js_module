import { ActionToken, IActionTokenForSave } from '../../entity/actionToken';

export interface IActionTokenRepository {
    saveActionToken(token: IActionTokenForSave): Promise<ActionToken>;
}
