var express = require('express');
var router = express.Router();
const weatherService = require("../services/WeatherInfoService");

/* GET users listing. */
router.get('/weatherdata', async(req, res) => {
    const authToken = req.headers['authorization'];
    try{
      const weatherData = await weatherService.getWeatherInfoCurrent(authToken);
      res.status(200).send(weatherData);
    }catch(error){
      console.log(error);
      res.status(400).send("Request failed");
  };
  }
)
module.exports = router;
