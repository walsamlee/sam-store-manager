'use strict';

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
   * 
   * @returns {} 
*/
var validateUser = function validateUser(user) {
  var schema = {
    firstname: _joi2.default.string().required(),
    lastname: _joi2.default.string().required(),
    email: _joi2.default.string().email({ minDomainAtoms: 2 }).required(),
    password: _joi2.default.string().required(),
    previllege: _joi2.default.number().integer(1).required()
  };

  return _joi2.default.validate(user, schema);
};

module.exports = validateUser;