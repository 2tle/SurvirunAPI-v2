import envLoader from './environment.js'
import databaseLoader from './database.js'
import expressLoader from './express.js'
import routerLoader from './router.js'
import socketioLoader from './socketio.js'

export default async ({ app }) => {
	await envLoader()
	await databaseLoader()
	await expressLoader(app)
	await routerLoader(app)
	await socketioLoader(app)
	
}