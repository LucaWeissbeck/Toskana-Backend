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


// Routers ------------------------------------------------
app.use('/weather', weatherRouter);
app.use('/camera', cameraRouter);
app.use('/ph', phValueRouter);
app.use('/information', informationRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});



module.exports = app;
