function randomInt (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}

//var x=randomInt(10,20);
var tempString="";
var humidity="";
var accelerometer="";
var singleData="";

 for (var i=1;i<=100;i++)
 { 
     singleData="Line "+ i + "- "+ randomInt(30,45) + " °C";
     tempString=tempString + "\n" + singleData;
 }

 for (var i=1;i<=100;i++)
 { 
     singleData="Line "+ i + "- "+ randomInt(40,100) + " %";
     humidity=humidity + "\n" + singleData;
 }

 for (var i=1;i<=100;i++)
 { 
     singleData="Line "+ i + "- "+ randomInt(1,100) + " ";
     accelerometer=accelerometer + "\n" + singleData;
 }

 var fs = require("fs");
 // temp
 var writerStream = fs.createWriteStream('temp_sensor.txt');
 writerStream.write(tempString,'UTF8');
 writerStream.end();
 writerStream.on('finish', function() {
     console.log("Write completed.");
 });
 writerStream.on('error', function(err){
    console.log(err.stack);
 });

  // humidity
  var writerStream = fs.createWriteStream('humidity_sensor.txt');
  writerStream.write(humidity,'UTF8');
  writerStream.end();
  writerStream.on('finish', function() {
      console.log("Write completed.");
  });
  writerStream.on('error', function(err){
     console.log(err.stack);
  });


   // humidity
   var writerStream = fs.createWriteStream('accelerometer_sensor.txt');
   writerStream.write(accelerometer,'UTF8');
   writerStream.end();
   writerStream.on('finish', function() {
       console.log("Write completed.");
   });
   writerStream.on('error', function(err){
      console.log(err.stack);
   });