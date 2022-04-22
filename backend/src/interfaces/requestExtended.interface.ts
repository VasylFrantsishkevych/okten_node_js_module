import { Request } from 'express';

import { IUser } from '../entity/user';

// Розширує стандартний express interface
export interface IRequestExtended extends Request {
    user?: IUser;
}
