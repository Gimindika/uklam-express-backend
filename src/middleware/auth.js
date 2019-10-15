require('dotenv').config();
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET_KEY;
const formResponse = require('../helpers/form-response');

const auth = {
    verifyToken: (req, res, next) => {
        const bearerHeader = req.headers['authorization'];
        if(bearerHeader !== undefined){
            const bearer = bearerHeader.split(' ');
            const token = bearer[1];
            
            try{
                const data = jwt.verify(token, secret);
                if(data){
                    // req.id = data.id;
                    req.email = data.email;
                    req.name = data.name;
                    req.role = data.role;
                    next();
                }
            } catch (err) {
                console.log(err);
                formResponse.success(res, 403, err )
            }

        } else {
            console.error('no bearer', bearerHeader)
            formResponse.success(res, 403, {error:'no bearer' } )
        }
    },

    verifyGuide: (req, res, next) => {
        if(req.role == "guide") { next() } else formResponse.success(res, 403, {error:'You are not a guide' } )
    }
}

module.exports = auth;