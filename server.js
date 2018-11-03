var express = require("express");
var bodyParser = require("body-parser");
var mongo_client = require("mongodb").MongoClient;

var app = express();
var PORT_NUM = 5000;


//Build DB
var DB_URL = "mongodb://localhost:27017/";
mongo_client.connect(DB_URL, function(err, db) {
    if (err) throw err;
    var dbo = db.db("playerDB");     
    dbo.collection("players").findOne({}, function(err, res) {
        if (err) throw err;
        console.log(res.username);
    });
    db.close();
});

//Set up body parser for POST requests
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

app.use(express.static(__dirname + "/public/"))

//Routing
app.get("/Login/index.html", function(request, response) {
    response.sendFile("Login/index.html");
});

app.get("/Register/index.html", function(request, response) {
    response.sendFile("Login/Register/index.html");
});

app.post("/Login", function(request, response) {
    var username = request.body.username;
    var password = request.body.password;
    console.log("Username is: " + username + ". Password is: " + password);
    response.end("yes");
});

app.listen(PORT_NUM, function() {
    console.log("Listening on port " + PORT_NUM);
});