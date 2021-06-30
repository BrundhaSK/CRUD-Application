const express = require("express");
const path = require("path");
const db = require("./models");
const Handlebars = require('handlebars');
const expressHandlebars = require("express-handlebars");
const bodyParser = require("body-parser");

const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const DataController = require("./controllers/datas");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(express.json())

app.set('views', path.join(__dirname, "/views/"));
const staticpath = path.join(__dirname, "/public");

app.engine("hbs", expressHandlebars({
    extname : "hbs",
    defaultLayout : "mainlayout",
    layoutsDir : __dirname + "/views/layouts",
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    partialsDir  : path.join(__dirname, 'views/partials')
}));

app.use('/css', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css")));
app.use('/js', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js")));
app.use('/jq', express.static(path.join(__dirname, "../node_modules/jquery/dist")));

app.set("view engine", "hbs");
app.use(express.static(staticpath))

app.get("/", (req, res) => {
    //res.send("Hello World");
    res.render("index");
});

app.use("/data", DataController);

app.listen("3000", () => {
    console.log("server at port 3000");
});