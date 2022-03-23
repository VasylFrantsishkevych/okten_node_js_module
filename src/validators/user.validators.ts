import * as Joi from 'joi';

import { regexes } from '../constants';

export const userValidators = {
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
        email: Joi
            .string()
            .regex(regexes.EMAIL)
            .trim()
            .lowercase()
            .required(),
        password: Joi
            .string()
            .min(8)
            .regex(regexes.PASSWORD)
            .required(),
    }),

    login: Joi.object({
        email: Joi
            .string()
            .regex(regexes.EMAIL)
            .trim()
            .lowercase()
            .required(),
        password: Joi
            .string()
            .min(8)
            .regex(regexes.PASSWORD)
            .required(),
    }),
};
