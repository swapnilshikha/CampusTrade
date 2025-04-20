const mongoose = require('mongoose')
//require('dotenv').config()

async function dbConnect(){
    const DB_URL=process.env.DB_URL
    const DB_NAME=process.env.DB_NAME

    try {
        await mongoose.connect(`${DB_URL}/${DB_NAME}`)
        console.log("Database Connected")
    } catch (error) {
        throw error
    }
}

module.exports = dbConnect