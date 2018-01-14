
var express = require('express');
var app = express();



console.log("\n\n\n\n\n\n") ;                           // poor man's clear console
                    // useful system debug info





var server = app.listen(8081, function () {
    
      var host = server.address().address
      var port = server.address().port
      console.log("Example app listening at http://%s:%s", host, port)
      console.log("Server listening on: " + JSON.stringify(server.address())) ;
      console.log(" ") ;
    })





var serverReqCount = 0 ;
function requestServer(req, res) {
    var dataRead = getSensorData() ;

    res.writeHead(200, { "Content-Type":"text/json" }) ;
    res.write(JSON.stringify(dataRead)) ;
    res.end() ;
    console.log(JSON.stringify(dataRead)) ;

    serverReqCount++ ;
}


function getSensorData() {

    var randomNum = Math.random() * 1000 ;
    var currTime = Date.now() ;

    return { randomNumber:randomNum.toFixed(3), currentTime:currTime } ;
}


var periodicActivity = function() {
    console.log("Server request count: " + serverReqCount) ;
} ;
var intervalID = setInterval(periodicActivity, 5000) ; // start the periodic activity
