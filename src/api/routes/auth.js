import { Router } from 'express'
import AuthService from '../../services/auth.js'
import { celebrate, Joi } from 'celebrate'

const route = Router()

export default (app) => {
	app.use('/auth', route)

	route.get(
		'/by-email/:email/exists',
		celebrate({
			params: Joi.object({
				email: Joi.string().email({ minDomainSegments: 2 }).required()
			}),
		}),
		async (req, res, next) => {
			try {
				return res.status(200).json({
					result: await AuthService.isEmailExists(req.params.email)
				})
			} catch (e) {
				console.error(e)
				return next(e)
			}
		}
	)
}