var express = require('express');
var router = express.Router();
const phMeasureService = require("../services/phMeasureService");

/* Returns complete present Data for outdoor & indoor module */
router.get('/all', async(req, res) => {
    try{
        const data = await(phMeasureService.getAllValues()); 
        res.status(200).send(data);
    }
    catch(err){
        console.error(err);
        res.status(400).send("Request failed");
    }
});

module.exports = router;