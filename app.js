//Basic Lib Import
const express = require('express');
const router = require('./src/routes/api');
const bodyParser = require('body-parser');
const app = new express();




//secure middleware Lib Import
const expressRateLimit = require('express-rate-limit');
const  helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xssClean = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');  

//Database Lib Import 
const mongoose = require('mongoose');

//Secure Middleware implementation
app.use(cors())
app.use(mongoSanitize())
app.use(helmet())
app.use(xssClean())
app.use(mongoSanitize())



//body parser implementation
app.use(bodyParser.json())
//Request Rate Limit
const limiter = expressRateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
})
app.use(limiter)

//database connection
let uri = "mongodb://localhost:27017/todo"

mongoose.connect(uri, {autoIndex:true} , { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log('Connected to database');
})
.catch((err) => {
    console.log(err);
})

//Routing Implementation
app.use("/api/v1",router);
// undefined routes implement 
app.use( "*", (req, res) => {
    res.status(404).json({
        status: "fail",
        message: "Route not found"
    })
})

module.exports = app 
