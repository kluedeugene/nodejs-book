const express = require('express');
const User = require('../schemas/user');
const Comment = require('../schemas/comment');

const router = express.Router();

router
	.route('/')
	.get(async (req, res, next) => {
		try {
			const users = await User.find({});
			res.json(users);
		} catch (err) {
			console.error(err);
			next(err);
		}
	})
	.post(async (req, res, next) => {
		try {
			const user = await User.create({
				name: req.body.name,
				age: req.body.age,
				married: req.body.married
			});
			console.log(user);
			res.status(201).json(user);
		} catch (err) {
			console.error(err);
			next(err);
		}
	});

router.get('/:id/comments', async (req, res, next) => {
	try {
		const comments = await Comment.find({ commenter: req.params.id }).populate('commenter'); //몽구스의 populate 는 자바스크립트로 돌아가기떄문에 속도가 느리다
		//populate 는 오브젝트아이디를 자동으로 실체 객체로 바꿔주는것이다.
		console.log(comments);
		res.json(comments);
	} catch (err) {
		console.error(err);
		next(err);
	}
});

module.exports = router;
