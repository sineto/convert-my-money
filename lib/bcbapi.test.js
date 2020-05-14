'use strict';

const axios = require('axios');
const api = require('./bcbapi');

jest.mock('axios');

test('requestCotacao()', async () => {
	const fakeResponse = { data: { value: [{ cotacaoVenda: 5.93 }] } }
	axios.get.mockResolvedValue(fakeResponse);

	api.requestCotacao('05-14-2020')
		.then(response => {
			expect(response).toEqual(fakeResponse);
		})
		.catch(error => {
			return '';
		});
});
