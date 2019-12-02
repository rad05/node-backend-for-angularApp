
var nJwt = require('njwt');
const path = require('path')


const signingKey = "secret"


const User = require(path.join(__dirname, '../models/userModel.js')).Users;


async function register(req, res, next) {
    try {
        let user = new User(req.body)
        let doc = await user.save();
        return res.status(200).json({
            message: "success"
        })
    }
    catch (error) {
        console.log("we have an error!!")
        return res.status(500).json({
            error: error
        })
    }
}

async function login(req, res, next) {

    try {
        let userInfo = await User.findOne({ name: req.body.name, password: req.body.password });
        console.log("THIS")
        console.log(userInfo)
        if (userInfo) {

            var claims = {
                iss: "http://localhost/",  // The URL of your service
                sub: userInfo._id,    // The UID of the user in your system
                scope: "self" //not needed
            }

            var jwt = nJwt.create(claims, signingKey);
            var token = jwt.compact();
            return res.status(200).json({
                token: token
            })

        }
        else {
            return res.status(401).json({
                message: "unauthorised"
            })

        }
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal Error",
            error: error
        })

    }
}








exports.register = register;
exports.login = login