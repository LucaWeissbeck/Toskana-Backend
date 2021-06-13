const axios = require("axios");

const getHomeData = async(authToken) => {
    const response = await axios.get("https://api.netatmo.com/api/gethomedata", {headers: {"accept" : "application/json", "Authorization" : "Bearer " + authToken}})
    return response.data; 
}

module.exports.getHomeData = getHomeData;