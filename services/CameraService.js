const axios = require("axios");
const NetatmoAuthorizeService = require("../services/NetatmoAuthorizeService");

const getHomeData = async() => {
    try{
        const response = await axios.get("https://api.netatmo.com/api/gethomedata", {headers: {"accept" : "application/json", "Authorization" : "Bearer " + NetatmoAuthorizeService.tokenData.authToken}});
        return response.data;
    }
    catch(error){
        if(error.response.status === 403){
            await NetatmoAuthorizeService.refreshToken();
            const response = await axios.get("https://api.netatmo.com/api/gethomedata", {headers: {"accept" : "application/json", "Authorization" : "Bearer " + NetatmoAuthorizeService.tokenData.authToken}});
            return response.data;
        }
        else{
            console.error(error);
        }
    }
}

module.exports.getHomeData = getHomeData;
