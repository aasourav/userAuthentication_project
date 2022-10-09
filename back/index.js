const express = require('express')
const mongoose = require('mongoose')
const router = require('./routes/userRoutes')
const cookieParser =require('cookie-parser')
const cors = require('cors')

mongoose.connect('mongodb://localhost:27017/Authentication').then(()=>{
    console.log("Mongodb Connected")
}).catch(err=>console.log("Monodb problem"))

const app = express()
app.use(cors({credentials:true, origin:"http://localhost:3000"}))
app.use(express.json())
app.use(cookieParser())


app.use('/',router)

app.listen(8800,()=>{
    console.log('Server is Running...')
})