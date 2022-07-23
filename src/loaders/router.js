import api from '../api/index.js'

export default async (app) => {
	app.use('/api', api())
}