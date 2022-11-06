import ioredis from "ioredis";

const redisClient = new ioredis({
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD,
    port: Number(process.env.REDIS_PORT)
});

export { redisClient }