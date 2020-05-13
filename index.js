const express = require('express');
const path = require('path');

const app = express();

// setting a view engine
app.set('view engine', 'ejs');

// setting templates directory
app.set('views', path.join(__dirname, 'views'));

// setting a public static server
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (request, response) => {
	response.render('home');
});

app.listen(3000, err => {
	if (err !== undefined) {
		console.log('Find a error: ', err);
		return
	}

	console.log('Convert My Money listened by http://localhost:3000');
});
