const express = require('express');
const path = require('path');
const app = express();

app.set('port', process.env.PORT || 3000);

app.use(
	(req, res, next) => {
		console.log('모든 요청에 실행합니다.');
		next();
	},
	(req, res, next) => {
		try {
			console.log(azzaaz); //여기서 에러난것을 캐치에서 잡아서 아래의 에러처리 미들웨어로 넘어가 콘솔이 찍힌다.
		} catch (error) {
			next(error); //next() 아무것도없으면 다음 미들웨어로 넘어가지만 인수가있으면 에러처리이다.
		}
	}
);

// app.use('/about',(req, res, next) => {       //about에서만 동작하는 미들웨어
// 	console.log('모든 요청에 실행합니다.');
// 	next();
// });

app.get('/', (req, res) => {
	//res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/', (req, res) => {
	res.send('Hello Express');
});

app.get('/category/Javascript', (req, res) => {
	res.send('Hello Javascript');
});

// app.get('/category/:name', (req, res) => {
// 	res.end('Hello wildcard');
// });

app.get('/about', (req, res) => {
	res.send('Hello Express');
});

app.use((req, res, next) => {
	res.status(200).send('404 처리 미들웨어'); //404, 500 등의 상태를 표시하면 헤커들의 공격분석점이 될수도있다.
});

app.use((err, req, res, next) => {
	//next 필수
	console.error(err);
	res.status(200).send('에러발생. 보여줄수없다.'); //에러처리 미들웨어
});

app.listen(app.get('port'), () => {
	console.log('익스프레스 서버실행중');
});

//미들웨어 확장 사용방법 미들웨어안에 미들웨어
//내가 만든 미들웨어안에 가져다쓰는 미들웨어를 쓰고 (req, res, next)를 붙이면된다.
// app.use('/', (req, res, next) => {
// 	if (req.session.id) {
// 		express.static(__dirname, 'public')(req, res, next);
// 	} else {
// 		next();
// 	}
// });
