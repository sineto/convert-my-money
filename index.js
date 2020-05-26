const express = require('express');
const path = require('path');
const currency = require('./lib/currency');
const bcb = require('./lib/bcbapi');

const app = express();
const PORT = process.env.PORT || 3000

// setting a view engine
app.set('view engine', 'ejs');

// setting templates directory
app.set('views', path.join(__dirname, 'views'));

// setting a public static server
app.use(express.static(path.join(__dirname, '/public')));

app.get('/', async (request, response) => {
	const cotacao = await bcb.requestExchange();
	console.log(cotacao);
	response.render('home', {
		cotacao: cotacao
	});
});

app.get('/cotacao', (request, response) => {
	const { cotacao, quantidade } = request.query;
	const conversao = currency.toBrl(cotacao, quantidade)

	if (!cotacao && !quantidade) {
		response.render('cotacao', {
			error: 'Valores inválidos!'
		});
		return
	}

	response.render('cotacao', {
		error: false,
		cotacao: currency.toMoney(cotacao, 'BRL'),
		quantidade: currency.toMoney(quantidade, 'USD'),
		conversao: currency.toMoney(conversao, 'BRL')
	});
});

app.listen(PORT, err => {
	if (err !== undefined) {
		console.log('Find a error: ', err);
		return
	}

	console.log('Convert My Money listened by http://localhost:3000');
});
