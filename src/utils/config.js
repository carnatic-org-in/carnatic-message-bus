const secrets = require('./secrets.js');
const dotenv = require('dotenv');
dotenv.config();

const AMQ_USER_NAME = secrets.read('AMQ_USER_NAME') || process.env.AMQ_USER_NAME;
const AMQ_PASSWORD = secrets.read('AMQ_PASSWORD') || process.env.AMQ_PASSWORD;
const RAAGA_API_HOST = process.env.RAAGA_API_HOST;
const RAAGA_API_PORT = process.env.RAAGA_API_PORT;
const RAAGA_API_VERSION = process.env.RAAGA_API_VERSION;
module.exports = {
    AMQ_USER_NAME,
    AMQ_PASSWORD,
    RAAGA_API_HOST,
    RAAGA_API_PORT,
    RAAGA_API_VERSION
}

