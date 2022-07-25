import { Router } from 'express'
import auth from './routes/auth.js'


export default () => {
	const app = Router()
	auth(app)
	return app
}