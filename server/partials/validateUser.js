import Joi from 'joi';
/**
   * 
   * @returns {} 
*/
const validateUser = (user) => {
  const schema = {
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    password: Joi.string().required(),
    previllege: Joi.number().integer(1).required()
  };

  return Joi.validate(user, schema);
};

module.exports = validateUser;