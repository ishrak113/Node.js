

//compression 

var fs = require("fs");
var zlib = require('zlib');
// Compress the file input.txt to input.txt.gz
fs.createReadStream('stream1.txt')
.pipe(zlib.createGzip())
.pipe(fs.createWriteStream('stream1.txt.gz'));

console.log("File Compressed.");