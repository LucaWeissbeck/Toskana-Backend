const mongoose = require("mongoose")
const PHModel = new mongoose.Schema({ 
    ph_value: String, 
    date: Date
},
{
    collection: "PH"
}
);

module.exports = mongoose.model("PH", PHModel);