const http = require('http');

const server = http
	.createServer((req, res) => {
		res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' }); //사파리 같은 브루우저가 html인지 문자열인지 구별못하기 때문에 이렇게 해줘야함, utf-8로 인코딩하면 한글이 깨지지 않음
		res.write('<h1>Hello world</h1>');
		res.write('<p>Hello server</p>');
		res.end();
	})
	.listen(8080);
server.on('listening', () => {
	console.log('Server is listening on port 8080');
});
server.on('error', (error) => {
	console.error(error);
});
