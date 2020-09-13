require('dotenv').config()

let PORT = process.env.PORT
let MONGODB = process.env.MONGODB

if (process.env.NODE_ENV === 'test') {
    MONGODB = process.env.TEST_MONGODB
}
module.exports = {
    MONGODB,
    PORT
}