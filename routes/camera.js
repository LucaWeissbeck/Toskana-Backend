var express = require('express');
var router = express.Router();
const cameraService = require("../services/CameraService")

/* Returns complete present Data for outdoor & indoor module */
router.get('/homedata', async(req, res) => {
    try{
        const homeData = await cameraService.getHomeData();
        res.status(200).send(homeData);
    }catch(error){
        console.log(error);
        res.status(400).send("Request failed");
    };
});

module.exports = router;
