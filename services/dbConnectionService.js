const mysql = require('mysql');
const host = process.env.DB_IP;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME;
const db_user = process.env.MONGO_USER
const db_password = process.env.MONGO_PASSWORD
const mongoose = require("mongoose")

// MySQL Connection
const my_sql_connection = mysql.createConnection({
  host: host,
  user: user,
  password: password,
  database: database
});

my_sql_connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to mysql');
});

// MongoDB Connection
mongoose.connect("mongodb+srv://" + String(db_user) + ":" + String(db_password) + "@cluster0.smdy5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  if (err) {
    console.log(err)
    throw err;
  }
  console.log("Connected to MongoDB");
});

module.exports = my_sql_connection;
