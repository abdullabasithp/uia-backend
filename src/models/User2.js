const mongoose = require('mongoose');

const Signup2UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    inputType: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Signup2User', Signup2UserSchema);
