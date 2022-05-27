require("dotenv").config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cors = require('cors');
const netatmoAuthorizeService = require("./services/netatmoAuthorizeService")

var weatherRouter = require('./routes/weather');
var cameraRouter = require('./routes/camera');
var phValueRouter = require('./routes/phValue');
const informationRouter = require("./routes/information");


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
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// Routers ------------------------------------------------
app.use('/api/weather', weatherRouter);
app.use('/api/camera', cameraRouter);
app.use('/api/ph', phValueRouter);
app.use('/api/information', informationRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});



module.exports = app;
