var express = require('express');
var router = express.Router();
const weatherService = require("../services/WeatherInfoService");

/* GET users listing. */
router.get('/weatherdata', async(req, res) => {
    try{
      const weatherData = await weatherService.getWeatherInfoCurrent();
      res.status(200).send(weatherData);
    }catch(error){
      console.log(error);
      res.status(400).send("Request failed");
  };
  }
)


module.exports = router;
