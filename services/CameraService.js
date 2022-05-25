const readDockerSecret = require("../util/dockerSecretsReader")
let HOME_ID = process.env.HOME_ID || readDockerSecret("HOME_ID");
const axios = require("axios");
const NetatmoAuthorizeService = require("../services/netatmoAuthorizeService");



const getHomeData = async() => {
    try{
        const response = await axios.get("https://api.netatmo.com/api/gethomedata", {headers: {"accept" : "application/json", "Authorization" : "Bearer " + NetatmoAuthorizeService.tokenData.authToken}});
        return response.data;
    }
    catch(error){
        if(error.response && error.response.status === 403){
            await NetatmoAuthorizeService.refreshTokenData();
            const response = await axios.get("https://api.netatmo.com/api/gethomedata", {headers: {"accept" : "application/json", "Authorization" : "Bearer " + NetatmoAuthorizeService.tokenData.authToken}});
            return response.data;
        }
        else{
            console.error(error.response);
        }
    }
}

const getRecentEvents = async() => {
    try{
        const response = await axios.get("https://api.netatmo.com/api/getevents?home_id=" + HOME_ID, { headers: { "accept": "application/json", "Authorization": "Bearer " + NetatmoAuthorizeService.tokenData.authToken}});
        return response.data
    }
    catch (error) {
        if (error.response && error.response.status === 403) {
            await NetatmoAuthorizeService.refreshTokenData();
            const response = await axios.get("https://api.netatmo.com/api/getevents?home_id=" + HOME_ID, { headers: { "accept": "application/json", "Authorization": "Bearer " + NetatmoAuthorizeService.tokenData.authToken} });
            return response.data;
        }
        else {
            console.error(error.response);
        }
    }
}


module.exports = {getHomeData, getRecentEvents}
