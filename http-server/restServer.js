const http = require('http');
const fs = require('fs').promises;

const users = {}; // 데이터 저장용

http
	.createServer(async (req, res) => {
		try {
			if (req.method === 'GET') {
				if (req.url === '/') {
					const data = await fs.readFile('./restFront.html');
					res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
					return res.end(data);
				} else if (req.url === '/about') {
					const data = await fs.readFile('./about.html');
					res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' }); //
					return res.end(data);
				} else if (req.url === '/users') {
					res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' }); // json 형식으로 응답
					return res.end(JSON.stringify(users));
				}
				// /도 /about도 /users도 아니면
				try {
					//폴더에서 해당하는 파일을 찾아서 프론트로 보내준다
					const data = await fs.readFile(`.${req.url}`);
					return res.end(data);
				} catch (err) {
					// 주소에 해당하는 라우트를 못찾았다는 404 error
				}
			} else if (req.method === 'POST') {
				if (req.url === '/user') {
					let body = '';
					//요청의 body를 stream 형식으로 받음
					req.on('data', (data) => {
						body += data;
					});
					//요청의 body를 다받은 후 실행됨
					return req.on('end', () => {
						console.log('POST 본문(Body):', body);
						const { name } = JSON.parse(body);
						const id = Date.now();
						users[id] = name;
						res.writeHead(201, { 'Content-Type': 'text/plain; charset=utf-8' });
						res.end('ok');
					});
				}
			} else if (req.method === 'PUT') {
				if (req.url.startsWith('/user/')) {
					const key = req.url.split('/')[2]; //req.url이 '/abc/1234'라고 할 때 req.url.split('/')[2]를 하면 1234가 나옵니다.
					let body = '';
					req.on('data', (data) => {
						body += data;
					});
					return req.on('end', () => {
						console.log('PUT 본문(Body):', body);
						users[key] = JSON.parse(body).name;
						res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
						return res.end('ok');
					});
				}
			} else if (req.method === 'DELETE') {
				if (req.url.startsWith('/user/')) {
					const key = req.url.split('/')[2];
					delete users[key];
					res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
					return res.end('ok');
				}
			}
			res.writeHead(404); //위에 해당하는게 아무것도 없다면 404 error
			return res.end('NOT FOUND');
		} catch (err) {
			console.error(err);
			res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
			res.end(err.message);
		}
	})
	.listen(8082, () => {
		console.log('8082번 포트에서 서버 대기 중입니다');
	});
