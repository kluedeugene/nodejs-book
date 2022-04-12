const express = require('express');
const path = require('path');
const app = express();

app.set('port', process.env.PORT || 3000);

app.use((req, res, next) => {
	console.log('모든 요청에 실행합니다.');
	next();
});

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
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
