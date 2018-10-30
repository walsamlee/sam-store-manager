'use strict';

var _pg = require('pg');

var _pg2 = _interopRequireDefault(_pg);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Pool = (0, _pg2.default)('Pool');


_dotenv2.default.config();

var pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.on('connect', function () {
  console.log('Connected to db');
});

var createProductsTable = function createProductsTable() {
  var queryText = 'CREATE TABLE IF NOT EXISTS\n      products(\n        id UUID PRIMARY KEY,\n        success VARCHAR(128) NOT NULL,\n        low_point VARCHAR(128) NOT NULL,\n        take_away VARCHAR(128) NOT NULL,\n        created_date TIMESTAMP,\n        modified_date TIMESTAMP\n      )';

  pool.query(queryText).then(function (res) {
    console.log(res);
    pool.end();
  }).catch(function (err) {
    console.log(err);
    pool.end();
  });
};