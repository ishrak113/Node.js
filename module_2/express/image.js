var express = require('express');
var app = express();

app.use(express.static('img'));

app.get('/', function (req, res) {
   res.send('Hello World');
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)

})

//http://127.0.0.1:8081/3.jpg