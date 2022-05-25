const readDockerSecret = require("../util/dockerSecretsReader")
const db_user = process.env.MONGO_USER || readDockerSecret("MONGO_USER");
const db_password = process.env.MONGO_PASSWORD || readDockerSecret("MONGO_PASSWORD");
const mongoose = require("mongoose")


// MongoDB Connection
mongoose.connect("mongodb+srv://" + String(db_user) + ":" + String(db_password) + "@toskana.jb217.mongodb.net/?retryWrites=true&w=majority", {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "PHValues"
   
}, (err) => {
  if (err) {
    console.log(err)
    throw err;
  }
  else{
    console.log("Connected to MongoDB");
  }
  
});


