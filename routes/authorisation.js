var express = require('express');
var router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const passport = require("passport");

router.post("/register", async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password || typeof username !== "string" || typeof password !== "string") {
        res.send("Improper Values");
        return;
    }

    User.findOne({ username }, async (err, doc) => {
        if (err) throw err;
        if (doc) res.send("User Already Exists");
        if (!doc) {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({
                username,
                password: hashedPassword
            });
            await newUser.save();
            res.send("Success");
        }
    })
});

router.post("/login", passport.authenticate("local"), (req, res) => {
    res.send("Sucessfully Authenticated");
});

router.get("/user", (req, res) => {
    res.send(req.user);
});

router.get("/logout", (req, res) => {
    req.logout();
    res.send("success");
})

module.exports = router;
