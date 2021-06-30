const Router = require("express");
const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();
const DataModel = mongoose.model("Data")

router.get("/list", (req, res) => {    
    DataModel.find((err, docs) => {
        if(!err){
            console.log(docs);
            res.render("list", { data : docs});
        }
        else{
            res.send("Error");
        }
    });
});

router.get("/add", (req, res) => {
    res.render("add-data")
});

router.post("/add", (req, res) => {
    var data = new DataModel();
    data.name = req.body.name;
    data.address = req.body.address;
    data.number = req.body.number;
    data.save((err, docs) => {
        if(!err){
            res.redirect("/data/list")
        }
        else{
            res.send("Error");
        }
    });
});


router.get("/delete/:id", (req, res) => {
    var id = req.params.id;
    DataModel.findByIdAndDelete(id, function (err, docs) {
        if (err){
            console.log(err);
        }
        else{
            console.log("Deleted : ", docs);
            res.redirect("/data/list");
        }
    });
});

router.get("/update/:id", (req, res) => {
    res.render("update");
});

router.post("/update", (req, res) => {
    console.log(req.body);

    DataModel.findOneAndUpdate(req.params.id, {$set : req.body}, {new: true}, function(err, data) {    
        if(!err){
            console.log(err);
        }
        else{
            console.log(data);
        }
    });
    res.redirect("/data/list")
});

module.exports = router;