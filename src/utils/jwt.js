import { promisify } from 'util'
import jwt from 'jsonwebtoken'
import redisClient from './redis.js'

const sign = (user) => {
	const payload = {
		id: user._id,
		email: user.email,
		username: user.username
	}
	return jwt.sign(payload, process.env.JWT_SECRET, {
		algorithm: 'HS256',
		expiresIn: '2h',
		issuer: 'Survirun'
	})
}

const verify = (token) => {
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET)
		return {
			ok: true,
			id: decoded.id,
			email: decoded.email,
			username: decoded.username
		}
	} catch (err) {
		return {
			ok: false,
			message: err.message
		}
	}
}

const refresh = () => {
	return jwt.sign({}, process.env.JWT_SECRET, {
		algorithm: 'HS256',
		expiresIn: '14d',
		issuer: 'Survirun'
	})
}

const refreshVerify = async (token, userId) => {
	const getAsync = promisify(redisClient.get).bind(redisClient)
	try {
		const data = await getAsync(userId)
		if (token === data) {
			try {
				jwt.verify(token, process.env.JWT_SECRET)
				return true
			} catch (err) {
				return false
			}
		} else {
			return false
		}
	} catch (err) {
		return false
	}
}

export {
	sign,
	verify,
	refresh,
	refreshVerify
}
