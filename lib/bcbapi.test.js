const axios = require('axios');
const { today, getUrl, getApi, getRate, pure } = require('./bcbapi');

jest.mock('axios');

it('returns a today date - today()', () => {
	const date = new Date();
	const dateStr = `${date.getMonth()+1}-${date.getDate()}-${date.getFullYear()}`;
	expect(today()).toBe(dateStr);
});

it('returns an api url with a given date - getUrl()', () => {
	const url = getUrl('QUALQUER-COISA');
	expect(url).toBe('https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%27QUALQUER-COISA%27&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao');
});

it('returns a data from the api url - getApi()', async () => {
	const fakeData = {
		data: {
			value: [{
				"cotacaoCompra": 4.64530,
				"cotacaoVenda": 4.64590,
				"dataHoraCotacao": "2020-03-06 13:06:46.785"
			}]
		}
	};

	const url = 'https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%2703-06-2020%27&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao';
	axios.get.mockReturnValueOnce(fakeData);

	expect(getApi(url).data).toBe(fakeData.data);
});

it('returns a currency exchange rate - getRate()', () => {
	const fakeResponse = { data: { value: [{ "cotacaoCompra": 4.64530 }] }};
	expect(getRate(fakeResponse)).toBe(4.64530);
});

describe('test resquesExchange function', ()=> {

	it('returns an exchange rate of the day - requestExchange()', () => {
		const fakeResponse = { data: { value: [{ "cotacaoCompra": 4.64530 }] }};

		const today = jest.fn();
		today.mockReturnValue('05-15-2020')

		const getUrl = jest.fn();
		getUrl.mockReturnValue('url');

		const getApi = jest.fn();
		getApi.mockResolvedValue(fakeResponse);

		const getRate = jest.fn();
		getRate.mockReturnValue(5.82230);

		pure.requestExchange({ today, getUrl, getApi, getRate })()
			.then(response => {
				expect(response).toBe(5.82230);
			});
	});

	it('returns a error ""', () => {
		const today = jest.fn();
		today.mockReturnValue('05-15-2020')

		const getUrl = jest.fn();
		getUrl.mockReturnValue('url');

		const getApi = jest.fn();
		getApi.mockReturnValue(Promise.reject('err'));

		const getRate = jest.fn();
		getRate.mockReturnValue(5.82230);

		pure.requestExchange({ today, getUrl, getApi, getRate })()
			.then(response => {
				expect(response).toBe('');
			});
	});
});

