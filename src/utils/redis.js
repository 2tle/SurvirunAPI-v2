import { createClient } from 'redis'

const redisClient = createClient(`redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`)

export default { redisClient }