'use strict';

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validateProduct = function validateProduct(prodItem) {
  var schema = {
    name: _joi2.default.string().required(),
    category: _joi2.default.string().required(),
    description: _joi2.default.string().required(),
    amount: _joi2.default.string().required(),
    minAllowed: _joi2.default.string().required(),
    price: _joi2.default.string().required()
  };

  return _joi2.default.validate(prodItem, schema);
};

module.exports = validateProduct;