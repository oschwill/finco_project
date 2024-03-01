import Joi from 'joi';

export const registerAccountSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'de'] } })
    .required(),
  password: Joi.string().min(8).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  passwordRepeat: Joi.any().valid(Joi.ref('password')).required(),
  terms: Joi.string().valid('terms').required(),
});
