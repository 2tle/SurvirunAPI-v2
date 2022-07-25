import mongoose from "mongoose"
const { Schema } = mongoose
import moment from 'moment-timezone'

const exercise = new Schema({
	uid: {
		type: String,
		required: true
	},
	calorie: {
		type: Number,
		default: 0
	},
	km: {
		type: Number,
		default: 0
	},
	time: {
		type: Number,
		default: 0
	},
	date: {
		type: String,
		default: moment().tz('Asia/Seoul').format('YYYY-MM-DD')
	}
})

export default mongoose.model('exercise', exercise)