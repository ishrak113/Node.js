// random generator function
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
    }
// generate the random value
var myval = getRandomInt(0,100)
// set the value into the global variable
postman.setGlobalVariable("value",myval)

// to see it in console
console.log(myval)