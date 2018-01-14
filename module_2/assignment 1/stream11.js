var fs = require("fs");
var data = '';

// Create a readable stream
var readerStream = fs.createReadStream('stream3.txt');


// Handle stream events --> data, end, and error
readerStream.on('data', function(chunk) {
    data += chunk;
 });
 
 readerStream.on('end',function(){
    console.log(data);


var buf=new Buffer (data)
var len=data.length
for (var i=0;i<len;i++){
buf[i]=buf[i]+1
}
console.log(buf.toString())





    // Create a writable stream
    var writerStream = fs.createWriteStream('output.txt');

// Write the data to stream with encoding to be utf8
writerStream.write(buf,'UTF8');

// Mark the end of file
writerStream.end();

// Handle stream events --> finish, and error
writerStream.on('finish', function() {
    console.log("Write completed.");
});

writerStream.on('error', function(err){
   console.log(err.stack);
});

console.log("Program Ended");
 });


//the prob with the previous code was with read.end it was ending then in the time of writing it wasnt getting a data
//so the thing to do is to write the write code inside the loop so that the minuited after end reading it will write 
//this is the way because it is an asyncronous code /operation 



 
