async function getBoard() {
	// 로딩 시 게시글 가져오는 함수
	try {
		const res = await axios.get('/boardjson');
		const boardtext = res.data;
		const list = document.getElementById('boardlist');
		list.innerHTML = '';
		// 사용자마다 반복적으로 화면 표시 및 이벤트 연결
		Object.keys(boardtext).map(function (key) {
			const userDiv = document.createElement('div');
			const span = document.createElement('span');
			span.textContent = boardtext[key];
			const edit = document.createElement('button');
			edit.textContent = '수정';
			edit.addEventListener('click', async () => {
				// 수정 버튼 클릭
				const boardtext = prompt('바꿀 이름을 입력하세요');
				if (!boardtext) {
					return alert('이름을 반드시 입력하셔야 합니다');
				}
				try {
					await axios.put('/board/' + key, { boardtext });
					getBoard();
				} catch (err) {
					console.error(err);
				}
			});
			const remove = document.createElement('button');
			remove.textContent = '삭제';
			remove.addEventListener('click', async () => {
				// 삭제 버튼 클릭
				try {
					await axios.delete('/board/' + key);
					getBoard();
				} catch (err) {
					console.error(err);
				}
			});
			userDiv.appendChild(span);
			userDiv.appendChild(edit);
			userDiv.appendChild(remove);
			list.appendChild(userDiv);
			console.log(res.data);
		});
	} catch (err) {
		console.error(err);
	}
}
window.onload = getBoard; // 화면 로딩 시 getUser 호출
// 폼 제출(submit) 시 실행
document.getElementById('form').addEventListener('submit', async (e) => {
	e.preventDefault();
	const boardtitle = e.target.title.value;
	console.log('front:', boardtitle);
	const boarddesc = e.target.description.value;

	if (!boardtitle) {
		return alert('제목을 입력하세요');
	} else if (!boarddesc) {
		return alert('내용을 입력하세요');
	}
	try {
		await axios.post('/postboard', { boardtitle, boarddesc }); //POST  형식으로 요청 title 데이터도 전송
		//await axios.post('/postboard', { boarddesc }); //POST  형식으로 요청 name 데이터도 전송
		getBoard();
	} catch (err) {
		console.error(err);
	}
	e.target.title.value = '';
	e.target.description.value = '';
});
