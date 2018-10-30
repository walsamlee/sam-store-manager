const products = [];
/**
   * 
   * @returns {} 
*/
const addItem = (data) => {
	products.push(data);
}

const showProducts = () => {
	return products;
}

module.exports = {addItem, showProducts};