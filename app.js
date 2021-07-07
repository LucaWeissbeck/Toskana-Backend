require("dotenv").config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');




var authRouter = require('./routes/netatmoauthorisation');
var weatherRouter = require('./routes/weather');
var cameraRouter = require('./routes/camera');
var phValueRouter = require('./routes/phValue');
const userAuthRouter = require("./routes/authorisation");
const { default: axios } = require("axios");

var app = express();


// Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// Middleware
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());


app.use("/authorize", userAuthRouter);
app.use('/authorise', authRouter);
app.use('/weather', weatherRouter);
app.use('/camera', cameraRouter);
app.use('/ph', phValueRouter);

const userauth = require("./services/authorisationService")


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});



module.exports = app;
