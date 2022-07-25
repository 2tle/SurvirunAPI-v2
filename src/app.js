import express from 'express'
import dotenv from 'dotenv'
import loader from './loaders/index.js'
import { createServer } from 'http'

async function bootstrap() {
	const app = express()
	dotenv.config()
	await loader({ app })

	const server = createServer(app)
	app.io.attach(server)
	server.listen(app.get('service_port'))
	server.on('listening', () => {
		console.log(`Server is listening port ${app.get('service_port')}`)
	})
}

bootstrap()