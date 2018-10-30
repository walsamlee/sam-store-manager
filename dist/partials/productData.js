"use strict";

var products = [];
/**
   * 
   * @returns {} 
*/
var addItem = function addItem(data) {
  products.push(data);
};

var showProducts = function showProducts() {
  return products;
};

module.exports = { addItem: addItem, showProducts: showProducts };