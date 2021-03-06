const axios = require('axios');

const getUrl = date => `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%27${date}%27&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao`;
const getApi = (url) => axios.get(url);
const getRate = response => {
	return response.data.value[0].cotacaoCompra;
};

const today = () => {
	const date = new Date();
	return `${date.getMonth()+1}-${date.getDate()}-${date.getFullYear()}`;
};

const requestExchange = ({ today, getUrl, getApi, getRate }) => {
	return async () => {
		try {
			const date = today();
			const url = getUrl(date);
			const response = await getApi(url);
			const rate = getRate(response);
			return rate
		} catch(err) {
			return '';
		}
	};
};

module.exports = {
	today,
	getUrl,
	getApi,
	getRate,
	requestExchange: requestExchange({ today, getUrl, getApi, getRate }),
	pure: { requestExchange }
};
