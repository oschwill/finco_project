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

export const addTransactionSchema = Joi.object({
  transaction_type: Joi.string().valid('income', 'expense').required(),
  user_id: Joi.number().required(),
  amount: Joi.string()
    .pattern(/^\d+(\.\d{1,2})?$/)
    .required(),
  category: Joi.string().min(3).max(30).required(),
  date: Joi.date().iso().required(),
});
