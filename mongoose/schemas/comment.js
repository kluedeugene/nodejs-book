const mongoose = require('mongoose');

const { Schema } = mongoose;
const {
	Types: { ObjectId }
} = Schema; //구조분해할당으로 objectid를 꺼낸다 (스키마 안의 타입스 안의 objectid)
const commentSchema = new Schema({
	commenter: {
		type: ObjectId,
		required: true,
		ref: 'User' // 윗줄의 objectid가  User 스키마의 objectid 라는것을 의미한다.
	},
	comment: {
		type: String,
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Comment', commentSchema);
