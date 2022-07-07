const User = require('../models/User');
const { SECRET } = require('../src/config/env');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.create = (userData) => User.create(userData);

exports.createToken = (user) => {

    const payload = { _id: user.id, username: user.username, email: user.email };
    const options = { expiresIn: '2d' };

    return new Promise((resolve, reject) => {
        jwt.sign(payload, SECRET, options, (err, decodedToken) => {

            if (err) {

                return reject(err);
            }

            resolve(decodedToken);

        });
    });
}


exports.login = async (email, password) => {

    const user = await User.findOne({ email});

    if (!user) {

        throw {

            message: 'Cannot find username or password'
        }
    }

    const isValid = bcrypt.compare(password, user.password);

    if (!isValid) {

        throw {

            message: 'Cannot find username or password'
        }

    }
    return user;
}
