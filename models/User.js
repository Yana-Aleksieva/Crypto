const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }

});

userSchema.pre('save', function (next) {

    bcrypt.hash(this.password, 11)
        .then((hashedPassword) => {
            this.password = hashedPassword;

            next();
        })

});

const User = mongoose.model('user', userSchema);

module.exports =  User;