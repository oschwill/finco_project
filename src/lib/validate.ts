import Joi from 'joi';

interface RegisterData {
  [key: string]: any;
}

type SchemaCallback = (attributes: string[]) => Joi.ObjectSchema;

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

export const dynamicRegisterSchema: SchemaCallback = (attributesToValidate) => {
  return Joi.object(
    Object.fromEntries(
      attributesToValidate.map((attribute: string) => [
        attribute,
        registerAccountSchema.extract(attribute) as Joi.Schema,
      ])
    )
  );
};

export const validateData = (data: RegisterData, cbSchema: SchemaCallback) => {
  const attributesToValidate = Object.keys(data);
  const schema = cbSchema(attributesToValidate);

  return schema.validate(data);
};
