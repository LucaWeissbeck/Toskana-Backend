const axios = require("axios");
const FormData = require("form-data")
const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const USERNAME = process.env.ACCOUNT_EMAIL
const PASSWORD = process.env.ACCOUNT_PASSWORD
const qs = require("qs")

tokenData = {
    authToken: "",
    refreshToken: ""
};

const getTokenData = async() => {
    try{
        const body = {
            "grant_type": "password",
            "client_id": CLIENT_ID,
            "client_secret": CLIENT_SECRET,
            "username": USERNAME,
            "password": PASSWORD,
            "scope": "read_station read_thermostat write_thermostat read_camera write_camera access_camera read_presence access_presence read_homecoach read_smokedetector"
        }

        const response = await axios({ method: "post", url: "https://api.netatmo.com/oauth2/token", data: qs.stringify(body), headers: {"Content-Type": "application/x-www-form-urlencoded"}})
        tokenData.authToken = response.data.access_token
        tokenData.refreshToken = response.data.refresh_token
        console.log(tokenData.authToken)

    } catch(err) {
        console.error(err.response.data)
    }
}

const refreshTokenData = async() => {
    try {
        const body = {
            "grant_type": "refresh_token",
            "refresh_token": tokenData.refreshToken,
            "client_id": CLIENT_ID,
            "client_secret": CLIENT_SECRET
        }

        const response = await axios({ method: "post", url: "https://api.netatmo.com/oauth2/token", data: qs.stringify(body), headers: { "Content-Type": "application/x-www-form-urlencoded" } })
        tokenData.authToken = response.data.access_token
        tokenData.refreshToken = response.data.refresh_token
    } catch (err) {
        console.error(err.response.data)
    }
}

module.exports = {getTokenData, refreshTokenData, tokenData}