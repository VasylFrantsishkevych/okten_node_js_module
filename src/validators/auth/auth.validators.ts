import * as Joi from 'joi';

import { regexes } from '../../constants';
import { commonValidators } from '../common/common.validators';

export const authValidators = {
    registration: Joi.object({
        firstName: Joi
            .string()
            .min(3)
            .max(25)
            .required(),
        lastName: Joi
            .string()
            .min(3)
            .max(25)
            .required(),
        age: Joi
            .number()
            .min(18)
            .max(100),
        phone: Joi
            .string()
            .regex(regexes.PHONE)
            .required(),
        email: commonValidators.emailValidator,
        password: commonValidators.passwordValidator,
    }),

    login: Joi.object({
        email: commonValidators.emailValidator,
        password: commonValidators.passwordValidator,
    }),
};
