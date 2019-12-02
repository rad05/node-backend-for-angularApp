var nJwt = require('njwt');
var secureRandom = require('secure-random');


function extractToken (req) {
 
    if (req.headers.authorization != undefined && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
        return req.query.token;
    }
    return null;
}


function authenticate(req, res, next) {
    let signingKey ="secret"
     let token = extractToken(req)
     if(token == null){
        return res.status(401).json({
            message: "unauthorised",
            status: 0
        })
     }
     
    nJwt.verify(token, signingKey, function (err, verifiedJwt) {
        if (err) {
            console.log(err); // Token has expired, has been tampered with, etc
        } else {
            console.log(verifiedJwt); // Will contain the header and body
          //  req.jwt = jwt;
            next();
        }
    });
}


exports.authenticate = authenticate



