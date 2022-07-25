import { verify } from '../../utils/jwt.js'
import { failRes } from '../../utils/response.js'

const authAccessToken = (req, res, next) => {
	if (req.headers.authorization) {
		const token = req.headers.authorization.split('Bearer ')[1]
		const result = verify(token)
		if (result.ok) {
			req.id = result.id
			req.email = result.email
			req.username = result.username
			next()
		} else {
			failRes(res, 401, 5, "Expired or Invaild Token")
		}
	} else {
		failRes(res, 401, 6, "Not logged in")
	}
}

const authAccessTokenSocketio = (socket, next) => {
	if (socket.request.headers.authorization) {
		const token = socket.request.headers.authorization.split('Bearer ')[1]
		const result = verify(token)
		if (result.ok) {
			socket.decoded = {
				id: result.id,
				email: result.email,
				username: result.username
			}
			next()
		} else {
			next(new Error("Expired or Invaild Token"))
		}
	} else {
		socket.disconnect(true)
	}

}


export { authAccessToken, authAccessTokenSocketio }