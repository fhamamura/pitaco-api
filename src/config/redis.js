const redis = require("redis");

const redisClient = redis.createClient({
  url: process.env.REDIS_URL,
});

redisClient.on("error", (err) => console.error("Erro no Redis", err));

redisClient.connect().then(() => console.log("Redis conectado!"));

module.exports = redisClient;
