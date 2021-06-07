var express = require('express');
var router = express.Router();
const phMeasureService = require("../services/phMeasureService");

/* Returns complete present Data for outdoor & indoor module */
router.get('/all', async(req, res) => {
    phMeasureService.getAllValues()
});

module.exports = router;