const http = require('http');

const server = http
	.createServer((req, res) => {
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
