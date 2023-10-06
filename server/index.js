const express = require('express')
require('dotenv').config()
const cookieParser = require('cookie-parser')
const cors = require('cors')
const sequalize = require('./database.js')
const router = require("./router/index.js")
const PORT = process.env.PORT || 5000
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use('/api', router)

const start = async () => {
    try {
        await sequalize.authenticate()
        await  sequalize.sync({alter: true})
        app.listen(PORT, () => console.log('App is working on port ' + PORT))
    } catch (e) {
        console.log(e)
    }
}

start()