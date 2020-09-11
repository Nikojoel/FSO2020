require('dotenv').config()

const PORT = process.env.PORT
const MONGODB = process.env.MONGODB

module.exports = {
    MONGODB,
    PORT
}