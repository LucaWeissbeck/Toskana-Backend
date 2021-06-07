const db = require("./db");

const getAllValues = () => {
    const test = db.query("SELECT * FROM PH", (err, rows) => {
        if(err) throw err;

        console.log("Data received from DB:");
        console.log(rows);
    })
    console.log(test)
}

module.exports.getAllValues = getAllValues;