require("dotenv").config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const netatmoAuthService = require("../services/NetatmoAuthorizeService");
let netatmoAuthKey = "";

var authRouter = require('./routes/netatmoauthorisation');
var weatherRouter = require('./routes/weather');
var cameraRouter = require('./routes/camera');
var phValueRouter = require('./routes/phValue');
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
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());


app.use('/authorise', authRouter);
app.use('/weather', weatherRouter);
app.use('/camera', cameraRouter);
app.use('/ph', phValueRouter);


// Handle 403 Requests to refresh Netatmo Token

app.use(["/weather", "/camera"], async(err, req, res, next) => {
  const statusCode = err.status;
  if (Number(statusCode)  === 500){
    try{
      const authInfo = netatmoAuthService.getToken();
      netatmoAuthKey = authInfo.access_token;
      next();
    }catch(error){
      console.error(error);
    }
  }
  else{
    next(err);
  }
});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});



module.exports = app;
