import { Router } from 'express'
import AuthService from '../../services/auth.js'
import { celebrate, Joi } from 'celebrate'

const route = Router()

export default (app) => {
	app.use('/auth', route)
	const authService = new AuthService()
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
					exists: await authService.isEmailExists(req.params.email)
				})
			} catch (e) {
				console.error(e)
				return next(e)
			}
		}
	)

	route.get(
		'/by-username/:username/exists',
		celebrate({
			params: Joi.object({
				username: Joi.string().required()
			}),
		}),
		async (req, res, next) => {
			try {
				return res.status(200).json({
					exists: await authService.isUsernameExists(req.params.username)
				})
			} catch (e) {
				console.error(e)
				return next(e)
			}
		}
	)
}