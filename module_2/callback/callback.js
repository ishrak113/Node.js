var fs = require("fs");

var data = fs.readFileSync('blockinput.txt');

console.log(data.toString());
console.log("Program Ended");