var express = require("express");
var bodyParser = require("body-parser");
var mongo_client = require("mongodb").MongoClient;
var fs = require("fs");

var app = express();
var PORT_NUM = 5000;


//Build DB
var DB_URL = "mongodb://localhost:27017/";
mongo_client.connect(DB_URL, function(err, db) {
    if (err) throw err;
    var dbo = db.db("playerDB");     
    dbo.collection("players").findOne({}, function(err, res) {
        if (err) throw err;
        console.log(res.username + " " + res.password);
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

app.post("/Login/Register", function(request, response) {
    console.log("POSTING REGISTER");
    var username = request.body.username;
    var password = request.body.password;
    console.log("Registering Username: " + username + " Password: " + password + "...");

    var query = { username : username, password : password};
    mongo_client.connect(DB_URL, function(err, db) {
        if (err) throw err;
        var player_db = db.db("playerDB");
        player_db.collection("players").find(query).toArray(function(err, result) {
            if (err) throw err;
            var found = false;
            result.forEach(element => {
                if (element.username == username) {
                    found = true;
                }
            });
            if (found) {
                console.log("Redirecting to register");
                response.redirect("/login/Register/");
                alert("That Username is already taken.");
            }
            else {
                var addition = { username : username, password : password };
                player_db.collection("players").insertOne(addition, function(err, res) {
                    if (err) throw err;
                    console.log("Added " + username + " to Database.");
                });
                console.log("Redirecting to login");
                response.redirect("/Login");
            }
        response.end();
        });
        player_db.collection("players").find({}).toArray(function(err, result_check) {
            if (err) throw err;
            console.log(result_check);    
        });
    });
});

app.post("/Login", function(request, response) {
    var username = request.body.username;
    var password = request.body.password;
    console.log("Username is: " + username + ". Password is: " + password);

    //Test against the DB
    mongo_client.connect(DB_URL, function(err, db) {
        if (err) throw err;
        var player_db = db.db("playerDB");
        var query = { username : username, password : password };
        player_db.collection("players").find(query).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            var found = false;
            result.forEach(element => {
                if (element.username == username && element.password == password) {
                    found = true;
                }
            });
            if (found) {
                console.log("ACCES GRANTED");
                response.redirect("/Login/Register/");
            }
            else {
                console.log("ACCESS DENIED");
                response.redirect("/Login");
            }
            response.end();
        });
        db.close();
    });
});

app.listen(PORT_NUM, "0.0.0.0", function() {
    console.log("Listening on port " + PORT_NUM);
});