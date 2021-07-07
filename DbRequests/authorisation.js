const db = require("../services/db");
const mysql = require('mysql');

const insertUser = (uuid, ip, timestamp) => {
    let sql = "INSERT INTO Users VALUES (?, ? , ?)";
    const values = [uuid, ip, timestamp];
    sql = mysql.format(sql, values)

    return new Promise((resolve, reject) => {
        db.query(sql, values, (err, rows) => {
            if (err){
                console.error("Error", err.stack);
                return;
            }
            resolve(rows);
        })
    })
}

module.exports.insertUser = insertUser;
