const axios = require("axios");
const qs = require("qs");
const macInnen = process.env.INDOOR_MAC;


const getWeatherInfoCurrent = async(authToken) => {
    const data = qs.stringify({
        "device_id" : macInnen,
        "get_favorites" : "false"
    })
    const response = await axios.get('https://api.netatmo.com/api/getstationsdata', {headers: {"accept" : "application/json", "Authorization" : "Bearer " + authToken}, data});
    return response.data;
};

module.exports.getWeatherInfoCurrent = getWeatherInfoCurrent;