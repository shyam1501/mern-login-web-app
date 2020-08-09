const redis = require('redis');
const appConsts = require('../config/constants');

const redisClient = redis.createClient(appConsts.REDIS.PORT, appConsts.REDIS.HOST);
module.exports = redisClient;
