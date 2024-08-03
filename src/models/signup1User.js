const mongoose = require('mongoose');

const signup1UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    inputType: {
        type: String
    }
});

const Signup1User = mongoose.model('Signup1User', signup1UserSchema);

module.exports = Signup1User;
