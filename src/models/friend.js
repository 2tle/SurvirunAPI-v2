import mongoose from "mongoose"
const { Schema } = mongoose

const friend = new Schema({
	uid: {
		type: String,
		required: true,
	},
	friends: [String]
})

export default mongoose.model('friend', friend)