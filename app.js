const express = require("express")
const app = express()
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport')
const session = require('express-session')
const path = require('path')
const cors = require('cors')

app.use(session({secret:"secret-key",resave:true,saveUninitialized:true}))
app.use(passport.initialize())
app.use(passport.session())
app.use(bodyParser.urlencoded({extended:false}))
app.use(cors())


const routes = require('./routes/api.js')
mongoose.connect("mongodb://localhost:27017/app", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(response => {
        console.log("mongoose connected")
    }, err => {
        next(err)
    })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'))

app.use("/", routes)

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send(err.stack)
})



app.listen(3006, () => {
    console.log("MAJOR APP server running on port 3006")
})