'use strict';

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validateSale = function validateSale(aSale) {
  var schema = {
    attendantId: _joi2.default.string().required(),
    attendantName: _joi2.default.string().required(),
    products: _joi2.default.string().required(),
    date: _joi2.default.string().required(),
    price: _joi2.default.string().required()
  };

  return _joi2.default.validate(aSale, schema);
};

module.exports = validateSale;