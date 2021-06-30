const mongoose = require("mongoose");

const db = 'mongodb://localhost:27017/CRUD';

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if(!err){
        console.log("Database Connected");
    }
    else{
        console.log("Connection Error");
    }
})

const Data = require("./datamodel");