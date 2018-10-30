import Joi from 'joi';
/**
   * 
   * @returns {} 
*/
const validateProduct = (prodItem) => {
  const schema = {
    name: Joi.string().required(),
    category: Joi.string().required(),
    description: Joi.string().required(),
    amount: Joi.string().required(),
    minAllowed: Joi.string().required(),
    price: Joi.string().required(),
  };

  return Joi.validate(prodItem, schema);
};

module.exports = validateProduct;