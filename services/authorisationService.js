const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require('uuid');
const hash = process.env.APP_PASSWORD_HASHED;
const dbAuthorisation = require("../DbRequests/authorisation");



const authorize = async(ip) => {
    const uuid = uuidv4();
    const timestamp = new Date();
    await(dbAuthorisation.insertUser(uuid, ip, timestamp));

    const data = {
        uuid: uuid,
        timestamp: timestamp,
        ip: ip
    };
    return data;
}

module.exports.authorize = authorize;
