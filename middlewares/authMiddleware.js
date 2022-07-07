
//const jwt = require('../utils/jwt.js');
const {COOKIE_NAME} = require('../src/config/env');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../src/config/env');


exports.auth = async (req, res, next) => {

    const token = req.cookies[COOKIE_NAME];

    if (token) {

        jwt.verify(token, SECRET, ((err, decodedToken) => {

            if (err) {
                res.clearCookie(COOKIE_NAME);
                return next(err);
            }

            req.user = decodedToken;
            res.locals.user = decodedToken;

            next();

        }))

    } else {

        next();
    }


}