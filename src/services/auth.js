import UserRepository from '../models/user.js'

export default class AuthService {
	static instance
	constructor() {
		if (AuthService.instance) {
			return AuthService.instance
		}
		AuthService.instance = this
	}

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

	async isUsernameExists(username) {
		const result = await this.getUserByUsername(username)
		if (!result) return false
		else return true
	}



}

