require("dotenv").config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("passport-local");
const LocalStrategy = passportLocal.Strategy;
const User = require("./models/User");
const bcrypt = require("bcrypt");
const dbConnectionService = require("./services/dbConnectionService")
const netatmoAuthorizeService = require("./services/netatmoAuthorizeService")




var weatherRouter = require('./routes/weather');
var cameraRouter = require('./routes/camera');
var phValueRouter = require('./routes/phValue');
const userAuthRouter = require("./routes/authorisation");
const informationRouter = require("./routes/information");
const { default: axios } = require("axios");

var app = express();


// Initialise Netatmo -----------------------------------------
netatmoAuthorizeService.getTokenData()

// Swagger ------------------------------------------------
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// Middleware ------------------------------------------------
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({credentials: true }));
app.use(
    session({
        secret: "secretcode",
        resave: true,
        saveUninitialized: true,
    })
);
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

// Passport ------------------------------------------------
passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
        if (err) throw err;
        if (!user) return done(null, false);
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) throw err;
            if (result === true) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    });
}));

passport.serializeUser((user, cb) => {
    cb(null, user.id);
});

passport.deserializeUser((_id, cb) => {
    User.findOne({ _id }, (err, user) => {
        const userInformation = {
            username: user.username,
            isAdmin: user.isAdmin
        };
        cb(err, userInformation);
    });
});


// Routers ------------------------------------------------
app.use("/authorize", userAuthRouter);
app.use('/weather', weatherRouter);
app.use('/camera', cameraRouter);
app.use('/ph', phValueRouter);
app.use('/information', informationRouter);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});



module.exports = app;
