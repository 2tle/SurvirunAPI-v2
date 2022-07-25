import UserRepository from '../models/user.js'

class AuthService {
	constructor() { }

	async getUserById(id) {
		return await UserRepository.findOne({ _id: id })
	}

	async getUserByEmail(email) {
		return await UserRepository.findOne({ email: email })
	}

	async getUserByUsername(username) {
		return await UserRepository.findOne({ username: username })
	}

	async isEmailExists(email) {
		const result = await this.getUserByEmail(email)
		if (!result) return false
		else return true
	}
}

const authService = new AuthService()

export default authService

// const getUserById = async (id) => { return await User.findOne({ _id: id }) }
// const getUserByEmail = async (email) => { return await User.findOne({ email: email }) }
// const getUserByUsername = async (username) => { return await User.findOne({username: username}) }

// const createToken = (user) => {
// 	if(user != null) {
// 		const 
// 	} else {
// 		//throw new Error()
// 	}
// }