'use strict';

var users = [{
  'id': 1,
  'email': 'admin@store.com',
  'password': 'computer',
  "previllege": 1
}];
/**
   * 
   * @returns {} 
*/
var user = function user(data) {
  users.push(data);
};

var showUser = function showUser() {
  return users;
};

module.exports = { user: user, showUser: showUser };