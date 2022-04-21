const mongoose = require('mongoose');

const { Schema } = mongoose;
const userSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	age: {
		type: Number, //몽고디비의 int32 와같은 자유로운 형식이 아닌 json기반 형식을 사용하여야한다(몽구스를 사용하기때문)
		required: true
	},
	married: {
		type: Boolean,
		required: true
	},
	comment: String,
	createdAt: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('User', userSchema);
