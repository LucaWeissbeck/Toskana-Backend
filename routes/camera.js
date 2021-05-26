var express = require('express');
var router = express.Router();
const cameraService = require("../services/CameraService")

/* Returns complete present Data for outdoor & indoor module */
router.get('/homedata', async(req, res) => {
    const authToken = req.headers['authorization'];
    try{
        const homeData = await cameraService.getHomeData(authToken);
        res.status(200).send(homeData);
    }catch(error){
        console.log(error);
        res.status(400).send("Request failed");
    };
});

module.exports = router;
