const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const PORT = process.env.PORT || 5000


//Connect to DB
connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended : false}))


app.get('/',(req,res) => {
    res.status(200).json({message: 'Welcome to the support desk API'})
})
// we just created a GET request in our server

//Routes
app.use('/api/users', require('./routes/userRoutes'))

//error Handler
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server has started on Port ${PORT}`))