const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const multer = require("multer");
const session = require("express-session");
const fs = require('fs');
const { connectDB, Profile1, Profile2, User1, User2 } = require('./config/db');

const app = express();

// Ensure the correct uploads directory exists
const uploadsDir = path.join(__dirname, 'views', 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({ secret: "secret-key", resave: false, saveUninitialized: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("backend/public"));

// Serve static files from the correct uploads directory
app.use('/uploads', express.static(uploadsDir));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadsDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Middleware to check authentication for User1
const isAuthenticated1 = async (req, res, next) => {
    try {
        const user = await User1.findOne({ name: req.session.username });
        if (user) {
            req.user = user;
            next();
        } else {
            res.redirect('/login1');
        }
    } catch (error) {
        console.error("Error checking authentication:", error);
        res.redirect('/login1');
    }
};

// Middleware to check authentication for User2
const isAuthenticated2 = async (req, res, next) => {
    try {
        const user = await User2.findOne({ username: req.session.username });
        if (user) {
            req.user = user;
            next();
        } else {
            res.redirect('/login2');
        }
    } catch (error) {
        console.error("Error checking authentication:", error);
        res.redirect('/login2');
    }
};

// Routes for User1
app.get("/login1", (req, res) => {
    res.render("login1", { error: null });
});

app.get("/dD@@!&*hgfh44535@111!rdfgDgfjJ&&&lk899&tT7tt&tT*@dDW@&5KH@@64654D8&*&eedSWqa@!!Dgs!s**@xX!&ign*25S1sgGFg445&aaaA5ahG&*87Gfdfv@@wq&546SSasasadsDhgjTRcfbgfrty@!dffcf*up2*2@Asq&&", (req, res) => {
    res.render("signup1");
});

app.get("/profile1", isAuthenticated1, async (req, res) => {
    try {
        const profile = await Profile1.findOne({ username: req.user.name });
        res.render("profile1", { profile });
    } catch (error) {
        console.error("Error fetching profile:", error);
        res.render("error", { message: "An error occurred while fetching the profile." });
    }
});

app.get("/edit-profile1", isAuthenticated1, async (req, res) => {
    try {
        const profile = await Profile1.findOne({ username: req.user.name });
        res.render("edit-profile1", { profile });
    } catch (error) {
        console.error("Error fetching profile for edit:", error);
        res.render("error", { message: "An error occurred while fetching the profile for editing." });
    }
});

app.get("/home1", isAuthenticated1, async (req, res) => {
    try {
        const profile = await Profile1.findOne({ username: req.session.username });
        res.render("home1", { profile });
    } catch (error) {
        console.error("Error fetching profile for home1 page:", error);
        res.render("error", { message: "An error occurred while fetching the profile for home1 page." });
    }
});

// Render login2 page with error set to null initially
app.get("/login2", (req, res) => {
    res.render("login2", { error: null });
});


app.get("/aZ!@!!@ZFga57W*7GUYGD&HKH@@64654D8&*&eedSWqa@!!Dgs!s**@xX!&ign*25S1sgGFg445&aaaA5ahG&*87Gfdfv@@wq&546SSasasadsDhgjTRcfbgfrty@!dffcf*up2*2@Asq&&", (req, res) => {
    res.render("signup2");
});

app.get("/profile2", isAuthenticated2, async (req, res) => {
    try {
        const profile = await Profile2.findOne({ username: req.user.username });
        res.render("profile2", { profile });
    } catch (error) {
        console.error("Error fetching profile:", error);
        res.render("error", { message: "An error occurred while fetching the profile." });
    }
});

app.get("/edit-profile2", isAuthenticated2, async (req, res) => {
    try {
        const profile = await Profile2.findOne({ username: req.user.username });
        res.render("edit-profile2", { profile });
    } catch (error) {
        console.error("Error fetching profile for edit:", error);
        res.render("error", { message: "An error occurred while fetching the profile for editing." });
    }
});

app.get("/home2", isAuthenticated2, async (req, res) => {
    try {
        const profile = await Profile2.findOne({ username: req.session.username });
        res.render("home2", { profile });
    } catch (error) {
        console.error("Error fetching profile for home2 page:", error);
        res.render("error", { message: "An error occurred while fetching the profile for home2 page." });
    }
});

// User1 signup
app.post("/signup1", async (req, res) => {
    const { name, password, inputType } = req.body;

    try {
        const existingUser = await User1.findOne({ name });

        if (existingUser) {
            return res.render("error", { message: "User already exists. Please choose a different username." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User1.create({ name, password: hashedPassword, inputType });

        res.redirect("/login1");
    } catch (error) {
        console.error("Error registering user:", error);
        res.render("error", { message: "An error occurred during registration. Please try again later." });
    }
});

app.post("/login1", async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User1.findOne({ name: username });

        if (!user) {
            return res.render("login1", { error: "User not found." });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (isPasswordMatch) {
            req.session.username = username;  // Set session username upon successful login
            return res.redirect("/home1");
        } else {
            return res.render("login1", { error: "Wrong password" });
        }
    } catch (error) {
        console.error("Error logging in:", error);
        return res.render("login1", { error: "An error occurred during login. Please try again later." });
    }
});

// User2 signup and login
app.post("/signup2", async (req, res) => {
    const { username, password, inputType } = req.body;

    try {
        const existingUser = await User2.findOne({ username });

        if (existingUser) {
            return res.render("error", { message: "User already exists. Please choose a different username." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User2.create({ username, password: hashedPassword, inputType });

        res.redirect("/login2");
    } catch (error) {
        console.error("Error registering user:", error);
        res.render("error", { message: "An error occurred during registration. Please try again later." });
    }
});

// Handle login2 POST request
app.post("/login2", async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User2.findOne({ username });

        if (!user) {
            return res.render("login2", { error: "User not found." });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (isPasswordMatch) {
            req.session.username = username;
            return res.redirect("/home2");
        } else {
            return res.render("login2", { error: "Wrong password" });
        }
    } catch (error) {
        console.error("Error logging in:", error);
        return res.render("login2", { error: "An error occurred during login. Please try again later." });
    }
});

// Profile creation for User1
app.post("/profile1", upload.single('photo'), async (req, res) => {
    const { username, name, dob, email, phoneNumber, bloodGroup, address, guardianName, guardianPhone } = req.body;
    const profilePhoto = req.file ? req.file.filename : null;

    try {
        const profile = new Profile1({
            username,
            name,
            dob,
            email,
            phoneNumber,
            bloodGroup,
            address,
            guardianName,
            guardianPhone,
            photo: profilePhoto
        });
        await profile.save();
        res.redirect("/profile1");
    } catch (error) {
        console.error("Error creating profile:", error);
        res.render("error", { message: "An error occurred during profile creation. Please try again later." });
    }
});

// Profile creation for User2
app.post("/profile2", upload.single('photo'), async (req, res) => {
    const { username, name, dob, email, phoneNumber, bloodGroup, address, guardianName, guardianPhone } = req.body;
    const profilePhoto = req.file ? req.file.filename : null;

    try {
        const profile = new Profile2({
            username,
            name,
            dob,
            email,
            phoneNumber,
            bloodGroup,
            address,
            guardianName,
            guardianPhone,
            photo: profilePhoto
        });
        await profile.save();
        res.redirect("/profile2");
    } catch (error) {
        console.error("Error creating profile:", error);
        res.render("error", { message: "An error occurred during profile creation. Please try again later." });
    }
});

// Profile update for User1
app.post("/update-profile1", isAuthenticated1, upload.single('photo'), async (req, res) => {
    const { name, dob, email, phoneNumber, bloodGroup, address, guardianName, guardianPhone } = req.body;
    const profilePhoto = req.file ? req.file.filename : null;

    try {
        const profile = await Profile1.findOne({ username: req.session.username });
        if (!profile) {
            return res.render("error", { message: "Profile not found." });
        }

        profile.name = name;
        profile.dob = dob;
        profile.email = email;
        profile.phoneNumber = phoneNumber;
        profile.bloodGroup = bloodGroup;
        profile.address = address;
        profile.guardianName = guardianName;
        profile.guardianPhone = guardianPhone;
        if (profilePhoto) {
            profile.photo = profilePhoto;
        }

        await profile.save();
        res.redirect("/profile1");
    } catch (error) {
        console.error("Error updating profile:", error);
        res.render("error", { message: "An error occurred during profile update. Please try again later." });
    }
});

// Profile2 Update Route
app.post("/update-profile2", upload.single('photo'), async (req, res) => {
    const { name, dob, email, phoneNumber, bloodGroup, address, guardianName, guardianPhone } = req.body;
    const profilePhoto = req.file ? req.file.filename : null;

    try {
        const profile = await Profile2.findOne({ username: req.session.username }); // Use session username
        if (!profile) {
            return res.render("error", { message: "Profile not found." });
        }

        profile.name = name;
        profile.dob = dob;
        profile.email = email;
        profile.phoneNumber = phoneNumber;
        profile.bloodGroup = bloodGroup;
        profile.address = address;
        profile.guardianName = guardianName;
        profile.guardianPhone = guardianPhone;
        if (profilePhoto) {
            profile.photo = profilePhoto;
        }

        await profile.save();
        res.redirect("/profile2"); // Redirect to profile2 page after successful update
    } catch (error) {
        console.error("Error updating profile:", error);
        res.render("error", { message: "An error occurred during profile update. Please try again later." });
    }
});
// Handle change password request for signup1 user
app.post("/changepassword1", isAuthenticated1, async (req, res) => {
    const { currentPassword, newPassword, confirmNewPassword } = req.body;
    const username = req.session.username;

    try {
        const user = await User1.findOne({ name: username });

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const isPasswordMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Current password is incorrect." });
        }

        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({ message: "New passwords do not match." });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: "Password successfully changed." });
    } catch (error) {
        console.error("Error changing password:", error);
        res.status(500).json({ message: "An error occurred while changing password. Please try again later." });
    }
});



// Handle change password request for signup2 user
app.post("/changepassword2", isAuthenticated2, async (req, res) => {
    const { currentPassword, newPassword, confirmNewPassword } = req.body;
    const username = req.session.username;

    try {
        const user = await User2.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const isPasswordMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Current password is incorrect." });
        }

        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({ message: "New passwords do not match." });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: "Password successfully changed." });
    } catch (error) {
        console.error("Error changing password:", error);
        res.status(500).json({ message: "An error occurred while changing password. Please try again later." });
    }
});

// Add logout route for User1
app.get("/logout1", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Error logging out:", err);
            return res.redirect("/home1");
        }
        res.redirect("/login1");
    });
});

// Add logout route for User2
app.get("/logout2", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Error logging out:", err);
            return res.redirect("/home2");
        }
        res.redirect("/login2");
    });
});

// Start the server
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
