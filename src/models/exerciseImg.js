import mongoose from "mongoose"
const { Schema } = mongoose
import moment from 'moment-timezone'

const exerciseImg = new Schema({
	uid: {
		type: String,
		required: true
	},
	date: {
		type: String,
		default: moment().tz('Asia/Seoul').format('YYYY-MM-DD')
	},
	time: {
		type: String,
		default: moment().tz('Asia/Seoul').format('hh:mm:ss')
	},
	img: {
		type: String
	}
})

export default mongoose.model('exerciseImg', exerciseImg)