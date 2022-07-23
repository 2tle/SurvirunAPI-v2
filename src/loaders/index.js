import envLoader from './environment.js'
import databaseLoader from './database.js'
import expressLoader from './express.js'
import routerLoader from './router.js'

export default async ({ app }) => {
	await envLoader()
	await databaseLoader()
	await expressLoader(app)
	await routerLoader(app)
}