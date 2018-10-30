"use strict";

var products = [];

var addItem = function addItem(data) {
	products.push(data);
};

var showProducts = function showProducts() {
	return products;
};

module.exports = { addItem: addItem, showProducts: showProducts };