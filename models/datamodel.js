const mongoose = require("mongoose");

var DataSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, 'Name is required']
    },
    address : {
        type : String
    },
    number : {
        type : String
    }
});

const DataModel = mongoose.model("Data", DataSchema)

module.exports = DataModel;              