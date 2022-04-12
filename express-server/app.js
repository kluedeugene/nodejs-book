const express = require('express');

const app = express();

app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
	res.end('Hello Express');
});

app.post('/', (req, res) => {
	res.end('Hello Express');
});

app.get('/about', (req, res) => {
	res.end('Hello Express');
});

app.listen(app.get('port'), () => {
	console.log('익스프레스 서버실행중');
});
