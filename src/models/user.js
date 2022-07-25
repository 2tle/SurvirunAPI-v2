import mongoose from "mongoose"
const { Schema } = mongoose

const user = new Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		index: true
	},
	username: {
		type: String,
		required: true,
		index: true
	},
	password: {
		type: String
	},
	profile: {
		type: String,
		default: ''
	},
	score: {
		type: Number,
		default: 0
	},
	intro: {
		type: String,
		default: ''
	}
})

export default mongoose.model('user', user)