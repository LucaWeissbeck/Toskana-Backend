const axios = require("axios");
const qs = require("qs");
const macInnen = process.env.INDOOR_MAC;
const NetatmoAuthorizeService = require("../services/netatmoAuthorizeService");

const getWeatherInfoCurrent = async() => {
    const data = qs.stringify({
        "device_id" : macInnen,
        "get_favorites" : "false"
    })
    try {
        const response = await axios.get('https://api.netatmo.com/api/getstationsdata', {headers: {"accept" : "application/json", "Authorization" : "Bearer " + NetatmoAuthorizeService.tokenData.authToken}, data});
        return response.data;
    }catch(error){
        if (error.response && error.response.status === 403){
            await NetatmoAuthorizeService.refreshTokenData();
            const response = await axios.get('https://api.netatmo.com/api/getstationsdata', {headers: {"accept" : "application/json", "Authorization" : "Bearer " + NetatmoAuthorizeService.tokenData.authToken}, data});
            return response.data;
        }
        else {
            console.error(error.response);
        }
        
    }

};

module.exports.getWeatherInfoCurrent = getWeatherInfoCurrent;
