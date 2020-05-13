const toBrl = (cotacao, quantidade) => {
	return cotacao * quantidade;
};

const toMoney = (valor, currency) => {
	let curr = new Intl.NumberFormat('pt-BR', {
		style: 'currency',
		currency
	});

	return curr.format(valor);
};

module.exports = {
	toBrl, toMoney
};
