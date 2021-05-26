var express = require('express');
var router = express.Router();
const netatmoAuthService = require("../services/NetatmoAuthorizeService")

/* Returns complete present Data for outdoor & indoor module */
router.get('/auth', async(req, res) => {
    try{
        const authInfo = await netatmoAuthService.getToken();
        res.status(200).send(authInfo);
    }catch(error){
        console.log(error);
        res.status(400).send("Request failed");
    };
});

module.exports = router;
