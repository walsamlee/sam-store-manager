'use strict';

var _pg = require('pg');

var _pg2 = _interopRequireDefault(_pg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*** ************DB Connect string ***************/
var connect = process.env.DATABASE_URL || 'postgres://adminstore:compt@localhost:5432/storemanagerdb';