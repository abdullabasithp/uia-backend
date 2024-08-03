const mongoose = require("mongoose");
const Profile1 = require("../models/Profile1");
const Profile2 = require("../models/Profile2");
const User1 = require("../models/User1");
const User2 = require("../models/User2");

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/login-tut", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("MongoDB connected...");
    } catch (err) {
        console.error("Database connection error:", err.message);
        process.exit(1);
    }
};

module.exports = {
    connectDB,
    Profile1,
    Profile2,
    User1,
    User2
};
