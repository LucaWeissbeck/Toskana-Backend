const db = require("./db");

const getAllValues = () => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM PH", (err, rows) => {
            if(err){
                return reject(new err)
            }
            resolve(rows);
        })

    })
}

module.exports.getAllValues = getAllValues;