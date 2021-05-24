var express = require('express');
var router = express.Router();
const weatherService = require("../services/NetatmoAuthorizeService")

/* Returns complete present Data for outdoor & indoor module */
router.get('/authorise', async(req, res) => {
    try{
        const weatherInfo = await weatherService.getToken();
        const weatherInfoJson = await weatherInfo.json;
        console.log(weatherInfo)
        res.status(200).send(weatherInfoJson);
    }catch(error){
        console.log(error);
        res.status(400).send("Request failed");
    };
});

module.exports = router;
