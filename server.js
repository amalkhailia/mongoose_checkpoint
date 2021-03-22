//require express
const express = require ('express')

//instance of express
const app = express()
// dotenv && configure
require ('dotenv').config()

//connect to db
const connectDB = require('./config/connectDB')
connectDB()
// middleware
app.use(express.json())
// import routes
app.use('/api/contacts',require('./routes/contact'))
//port
const PORT = process.env.PORT
//creation de serveur
app.listen(PORT,error  =>
    error ? console.console.error(error)
    :
    console.log(`server is running on port ${PORT}...`)
    )
