export const ENV = [
	'MONGODB_URL',
	'PORT',
	'JWT_SECRET',
	'REDIS_HOST',
	'REDIS_PORT',
	'REDIS_USERNAME',
	'REDIS_PASSWORD'
]

export default async () => {
	if (!process.env.NODE_ENV) process.env.NODE_ENV = 'production'
	if (!process.env.PORT) process.env.PORT = 3000
	for (const env_name of ENV)
		if (!process.env[env_name]) throw new Error(`Environment Variable ${env_name} was not found`)
}