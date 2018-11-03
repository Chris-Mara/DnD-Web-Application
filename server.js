var express = require("express");
var bodyParser = require("body-parser");
var app = express();

var PORT_NUM = 5000;

app.listen(PORT_NUM, function() {
    console.log("Listening on port " + PORT_NUM);
});
