const db = require("./dbConnectionService");
const PHModel = require("../models/PHModel");

const getAllValues = async() => {
    result = await PHModel.find({})
    return result
}

const getPastWeek = async() => {
    var lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);
    // Compute the time 7 days ago to use in filtering the data
    result = await PHModel.find({
        "date": { $gte: lastWeek }
    })
    return result
}

module.exports.getAllValues = getAllValues;
module.exports.getPastWeek = getPastWeek;