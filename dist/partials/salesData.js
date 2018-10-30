"use strict";

var sales = [];
/**
   * 
   * @returns {} 
*/
var addSales = function addSales(data) {
  sales.push(data);
};

var showSales = function showSales() {
  return sales;
};

module.exports = { addSales: addSales, showSales: showSales };