var express = require('express');
var router = express.Router();
const weatherService = require("../services/weatherInfoService");

/* GET users listing. */
router.get('/weatherdata', async(req, res) => {
    try{
      const weatherData = await weatherService.getWeatherInfoCurrent();
      res.status(200).send(weatherData);
    }catch(error){
      console.log(error.response);
      res.status(400).send("Request failed");
  };
  }
)


module.exports = router;
