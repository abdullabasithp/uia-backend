const mongoose = require("mongoose");

const profile2Schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /^\d+$/.test(v);  // Ensures only numbers are allowed
            },
            message: props => `${props.value} is not a valid username! Only numbers are allowed.`
        }
    },
    name: { type: String, required: true },
    dob: { type: Date, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    bloodGroup: { type: String, required: true },
    address: { type: String, required: true },
    guardianName: { type: String, required: true },
    guardianPhone: { type: String, required: true },
    photo: { type: String, default: "" }
});

profile2Schema.post('save', function(error, doc, next) {
    if (error.errors) {
        const errorMessage = Object.values(error.errors).map(val => val.message);
        return next(new Error(errorMessage.join(', ')));
    }
    next(error);
});

const Profile2 = mongoose.model("Profile2", profile2Schema);

module.exports = Profile2;
