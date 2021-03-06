const http = require('http');
const { json } = require('stream/consumers');
const fs = require('fs').promises;
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

const users = {}; // 데이터 저장용
const titlejson = {};
const descjson = {};

if (cluster.isMaster) {
	console.log(`마스터 프로세스 아이디: ${process.pid}`);
	// CPU 개수만큼 워커를 생산
	for (let i = 0; i < numCPUs; i += 1) {
		cluster.fork();
	}
	// 워커가 종료되었을 때
	cluster.on('exit', (worker, code, signal) => {
		console.log(`${worker.process.pid}번 워커가 종료되었습니다.`);
		console.log('code', code, 'signal', signal);
		cluster.fork(); //워커 종료되면 하나 새로 생성
	});
} else {
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
					} else if (req.url === '/board') {
						const data = await fs.readFile('./board.html');
						res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
						return res.end(data);
					} else if (req.url === '/boardjsontitle') {
						res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' }); // json 형식으로 응답
						return res.end(JSON.stringify(titlejson));
					} else if (req.url === '/boardjsondesc') {
						res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' }); // json 형식으로 응답
						return res.end(JSON.stringify(descjson));
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
							console.log('User 파트 POST 본문(Body):', body);
							const { name } = JSON.parse(body);
							const id = Date.now();
							users[id] = name;
							console.log('users 파트 parsing:', users[id]);

							res.writeHead(201, { 'Content-Type': 'text/plain; charset=utf-8' });
							res.end('ok');
						});
					} else if (req.url === '/postboard') {
						let body = '';
						//요청의 body를 stream 형식으로 받음
						req.on('data', (data) => {
							body += data;
						});
						//요청의 body를 다받은 후 실행됨
						return req.on('end', () => {
							console.log('User 파트 POST 본문(Body):', body);
							const { boardtitle } = JSON.parse(body); //front에서 axios post 할시 변수이름 같게 안하면 객체값이 undefined가 된다.이유?
							const { boarddesc } = JSON.parse(body); //front에서 axios post 할시 변수이름 같게 안하면 객체값이 undefined가 된다.이유?

							const id = Date.now();
							titlejson[id] = boardtitle;
							descjson[id] = boarddesc;

							console.log('parsing:', titlejson[id]);
							console.log('parsing:', descjson[id]);

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

			setTimeout(() => {
				// 워커 존재를 확인하기 위해 1초마다 강제 종료
				process.exit(1);
			}, 1000);
		})
		.listen(8082, () => {
			console.log('8082번 포트에서 서버 대기 중입니다');
		});
}
