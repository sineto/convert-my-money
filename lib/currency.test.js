const currency = require('./currency');

test('toBrl cotacao 4 for quantidade 4', () => {
	expect(currency.toBrl(4, 4)).toBe(16);
});

test('toBrl cotacao 6 for quantidade 1500', () => {
	expect(currency.toBrl(6, 1500)).toBe(9000);
});

test('toMoney to 2 BRL', () => {
	const curr = new Intl.NumberFormat('pt-BR', {
		style: 'currency',
		currency: 'BRL'
	});

	expect(currency.toMoney(2, 'BRL')).toEqual(curr.format(2));
});

test('toMoney to 2 USD', () => {
	const curr = new Intl.NumberFormat('pt-BR', {
		style: 'currency',
		currency: 'USD'
	});

	expect(currency.toMoney(2, 'USD')).toEqual(curr.format(2));
});
