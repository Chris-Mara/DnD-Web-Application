var express = require("express");
var bodyParser = require("body-parser");
var app = express();

var PORT_NUM = 5000;

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

app.get("/Login", function(request, response) {
    response.sendFile("Public/Login/index.html");
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