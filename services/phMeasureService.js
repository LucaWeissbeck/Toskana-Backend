const db = require("./dbConnectionService");

const getAllValues = () => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM PH", (err, rows) => {
            if(err){
                return reject(new err);
            }
            resolve(rows);
        })

    })
}

const getPastWeek = () => {
    const sql = "SELECT * FROM `PH`WHERE Time >= DATE(NOW()) - INTERVAL 7 DAY"
    return new Promise((resolve, reject) => {
        db.query(sql, (err, rows) => {
            if(err){
                return reject(new err);
            }
            resolve(rows);
        })
    })
}

module.exports.getAllValues = getAllValues;
module.exports.getPastWeek = getPastWeek;