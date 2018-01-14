

//decompression

var fs = require("fs");
var zlib = require('zlib');

// Decompress the file input.txt.gz to input.txt
fs.createReadStream('stream1.txt.gz')
   .pipe(zlib.createGunzip())
   .pipe(fs.createWriteStream('stream2.txt'));
  
console.log("File Decompressed.");