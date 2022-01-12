require("dotenv").config();
var express = require('express');
var router = express.Router();

router.get("/services", async (req, res) => {
    try {
        // boolean object containing the boolean of whether ENV key is present
        envKeysPresent = {
            // NetAtmo
            ACCOUNT_EMAIL: process.env.ACCOUNT_EMAIL ? true : false,
            ACCOUNT_PASSWORD: process.env.ACCOUNT_PASSWORD ? true : false,
            CLIENT_ID: process.env.CLIENT_ID ? true : false,
            CLIENT_SECRET: process.env.CLIENT_SECRET ? true : false,

            // + Security
            SECURITY_NETATMO: process.env.SECURITY_NETATMO ? true : false,

            // + Weather
            INDOOR_MAC: process.env.INDOOR_MAC ? true : false,

            // Pool Data
            POOL_DATA: process.env.POOL_DATA ? true : false
        }
        res.status(200).send(envKeysPresent)
    } catch (err) {
        console.error(err)
        res.status(400).send("Request Failed")
    }



})

module.exports = router