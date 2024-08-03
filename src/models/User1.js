const mongoose = require('mongoose');

const user1Schema = new mongoose.Schema({
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

const User1 = mongoose.model('Signup1User', user1Schema);

module.exports = User1;
