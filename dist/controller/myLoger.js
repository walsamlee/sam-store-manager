'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const router = express.Router();

var app = (0, _express2.default)();

var users = [{
  username: 'admin',
  password: 'computer',
  priviledge: 1
}, {
  username: 'sam',
  password: 'computer1',
  priviledge: 0
}];

var myLoger = app.post(function (req, res, next) {
  // const checkUser = users.find(user => user.username === req.body.username);
  // if (checkUser) {
  //   if (checkUser.password === req.body.password) {
  //     if (checkUser.priviledge === 1) {
  //       return res.send('Admin route access granted');
  //     }
  //     return res.send('Admin route access not granted');
  //   }
  //   return res.send(`Wrong password: ${req.body.password} entered`);
  // }
  // res.send(`${req.body.username} not found`);
  res.send('Hi');

  next();
});

module.exports = myLoger;