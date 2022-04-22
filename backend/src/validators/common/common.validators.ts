import * as Joi from 'joi';

import { regexes } from '../../constants';

export const commonValidators = {
    emailValidator: Joi
        .string()
        .regex(regexes.EMAIL)
        .trim()
        .lowercase()
        .required(),
    passwordValidator: Joi
        .string()
        .min(8)
        .regex(regexes.PASSWORD)
        .required(),
};
