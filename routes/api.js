const express = require("express")
var path = require('path')
const middleware = require(path.join(__dirname, '../middleware/middleware.js'))

const loginController = require(path.join(__dirname, '../controllers/login.controller.js'))
const dashboardController = require(path.join(__dirname, '../controllers/dashboard.controller.js'))

var router = express.Router()

router.get('/populate',dashboardController.populateData)
router.post('/register', loginController.register)
router.post('/login', loginController.login)
router.get('/list', dashboardController.list)
router.use(middleware.authenticate)















router.get('/profile', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../public/profile.html'))
})



module.exports = router;

