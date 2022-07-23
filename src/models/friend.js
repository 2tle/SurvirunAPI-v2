import mongoose, { Schema } from "mongoose"

const friend = new Schema({
	uid: {
		type: String,
		required: true,
	},
	friends: [String]
})

export default mongoose.model < mongoose.Document > ('friend', friend)