var fs = require("fs");
var data = '';
var dataHum = '';
var dataAcc = '';
var countTemp = 0;
var countHum = 0;
var countAcc = 0; 
var finalString='';
// Create a readable stream
var readerStream = fs.createReadStream('temp_sensor.txt');

// Set the encoding to be utf8. 
readerStream.setEncoding('UTF8');

// Handle stream events --> data, end, and error
readerStream.on('data', function(chunk) {
   data += chunk;
});

readerStream.on('end',function(){
    var arrTemp = data.split("\n");
    function printTemp () 
    { 
        // Local Time. USE THIS ONE. 
        var dt = new Date();
        console.log(dt + " " + arrTemp[countTemp] + " temperature ") ; 
        finalString=finalString +dt + " " + arrTemp[countTemp] + " temperature \n";
        writeToDatabase(finalString);
        countTemp++; 
        if (countTemp >100) { 
            
            clearInterval(intervalObject); 
        } 
    }
    var intervalObject = setInterval(printTemp, 2000);


});

readerStream.on('error', function(err){
   console.log(err.stack);
});


// Create a readable stream
var readerStream = fs.createReadStream('humidity_sensor.txt');

readerStream.setEncoding('UTF8');

readerStream.on('data', function(chunk) {
   dataHum += chunk;
});

readerStream.on('end',function(){
    var arrHum = dataHum.split("\n");
    function printHum () 
    { 
        
        var dt = new Date();
        console.log(dt + " " + arrHum[countHum] + " humidity ") ; 
        finalString=finalString +dt + " " + arrHum[countHum] + " humidity \n";
        writeToDatabase(finalString);
        countHum++; 
        if (countHum >100) { 
            console.log('exiting'); 
            clearInterval(intervalObject); 
        } 
    }
    var intervalObject = setInterval(printHum, 5000);


});

readerStream.on('error', function(err){
   console.log(err.stack);
});



var readerStream = fs.createReadStream('accelerometer_sensor.txt');

readerStream.setEncoding('UTF8');

readerStream.on('data', function(chunk) {
   dataAcc += chunk;
});

readerStream.on('end',function(){
    var arrAcc = dataAcc.split("\n");
    function printAcc () 
    { 
        
        var dt = new Date();
        console.log(dt + " " + arrAcc[countAcc] + " Acc ") ; 
        finalString=finalString +dt + " " + arrAcc[countAcc] + " Acc \n";
        writeToDatabase(finalString);
        countAcc++; 
        if (countAcc >100) { 
            
            clearInterval(intervalObject); 
        } 
    }
    var intervalObject = setInterval(printAcc, 10000);


});

readerStream.on('error', function(err){
   console.log(err.stack);
});


function writeToDatabase(data)
{
    var writerStream = fs.createWriteStream('Database.txt');
    writerStream.write(data,'UTF8');
    writerStream.end();
    writerStream.on('finish', function() {
    
    });
    
    writerStream.on('error', function(err){
       console.log(err.stack);
    });
    
}