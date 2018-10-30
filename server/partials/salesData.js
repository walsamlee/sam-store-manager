const sales = [];

const addSales = (data) => {
	sales.push(data);
}

const showSales = () => {
	return sales;
}

module.exports = {addSales, showSales};