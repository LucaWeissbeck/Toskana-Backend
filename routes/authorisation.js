var express = require('express');
var router = express.Router();
const authorisationService = require("../services/authorisationService");

router.get("/authorize", (req, res) => {
    const data = JSON.stringify(authorisationService.authorize(req.ip));
    res.status(201).send(data);

})


module.exports = router;
