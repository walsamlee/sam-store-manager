import Joi from 'joi';

const validateSale = (aSale) => {
  const schema = {
    attendantId: Joi.string().required(),
    attendantName: Joi.string().required(),
    products: Joi.string().required(),
    date: Joi.string().required(),
    price: Joi.string().required(),
  };

  return Joi.validate(aSale, schema);
};

module.exports = validateSale;