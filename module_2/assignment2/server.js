var express = require('express');
var app = express();
var fs = require("fs");

var id = 1;
var id=2;
var id=3;

app.get('/1/Temp/', function (req, res) {
  fs.readFile( __dirname + "/" + "", 'utf8', function (err, data) {
      console.log( data );
      res.end( data );
  });
  
})
app.get('/1/Light/', function (req, res) {
  fs.readFile( __dirname + "/" + "", 'utf8', function (err, data) {
      console.log( data );
      res.end( data );
  });
  
})
app.get('/1/Sound/', function (req, res) {
  var data = fs.readFileSync('i.txt');
  fs.writeFile( __dirname + "/" + "sensor_database.json", 'utf8', function (err, data) {
      console.log( data );
      res.end( data );
  });
  
})
app.put('/1/Temp/', function (req, res) {
  var data = fs.readFileSync('i.txt');
     // First read existing users.
     fs.writeFile( __dirname + "/" + "sensor_database.json", 'utf8', function (err, data) {
         data = JSON.parse( data );
          data["user" + 1];
         
         console.log( data );
         res.end( JSON.stringify(data));
     });
  })

  app.delete('/1/Temp/', function (req, res) {
    
       // First read existing users.
       fs.readFile( __dirname + "/" + "sensor_database.json", 'utf8', function (err, data) {
           data = JSON.parse( data );
           delete data["user" + 1];
           
           console.log( data );
           res.end( JSON.stringify(data));
       });
    })

app.delete('/1/Light/', function (req, res) {
  
     // First read existing users.
     fs.readFile( __dirname + "/" + "sensor_database.json", 'utf8', function (err, data) {
         data = JSON.parse( data );
         delete data["user" + 2];
         
         console.log( data );
         res.end( JSON.stringify(data));
     });
  })
  app.delete('/1/Sound/', function (req, res) {
    
       // First read existing users.
       fs.readFile( __dirname + "/" + "sensor_database.json", 'utf8', function (err, data) {
           data = JSON.parse( data );
           delete data["user" + 3];
           
           console.log( data );
           res.end( JSON.stringify(data));
       });
    })

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)

})