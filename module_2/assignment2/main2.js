/*
Noise Alarm v2
Chris Green 23/08/2015

This code takes a sample of the background noise on startup.
It takes a noise reading (average of 128, 2us samples) every second, if the current noise level is 20dB greater than the background noise level (set on start) then it changes the alert level variable to 2. The variable alert level is sent to intel's enable IoT analytics dashboard. A change in alert level 2 triggers an email to be sent.

Requirements
- Edison arduino breakout board
- Grove sound sensor (microphone) connected to analog pin 0
- Grove temperature sensor connected to analog pin 2
- Grove light sensor connected to analog pin 1
- Grove LCD display connected to I2C
- Grove pushbutton connected to digital pin 2
*/

//Content for enable IoT
var dgram = require('dgram');
var client = dgram.createSocket('udp4');

// UDP Options
var options = {
    host : '127.0.0.1',
    port : 41234
};
var countmsg =0;
//Intel Enable Iot Send Observation Info.
function sendObservation(name, value, on){
    var msg = JSON.stringify({
        n: name,
        v: value,
        on: on
    });

    var sentMsg = new Buffer(msg);
    countmsg = countmsg + 1;
    console.log("Sending observation: " + sentMsg + " Len: " + sentMsg.length + " Count: " + countmsg); //add len to
    client.send(sentMsg, 0, sentMsg.length, options.port, options.host);
};
//End content for enable IoT
var mraa = require('mraa');
var groveSensor = require('jsupm_grove'); //setup sensor
//setup microphone
var upmMicrophone = require("jsupm_mic"); 
var myMic = new upmMicrophone.Microphone(0);
var threshContext = new upmMicrophone.thresholdContext;
threshContext.averageReading = 0;
threshContext.runningAverage = 0;
threshContext.averagedOver = 2;
var reading;
//end setup microphone
var is_running = false;
var tempPin = new groveSensor.GroveTemp(2); //Set up analog temp input
var lightPin = new groveSensor.GroveLight(1) //Set up analog light input
var buttonPin = new mraa.Gpio(2); //button pin = 2
buttonPin.dir(mraa.DIR_IN); //set the gpio direction to input
var lcd = require('jsupm_i2clcd'); //setup LCD
var display = new lcd.Jhd1313m1(0, 0x3E, 0x62); //setup LCD
var red = 255, blue = 255, green = 255; // set backlight colour to white
display.setColor(red,blue,green); // set backlight colour to white

var sampleRate = 50; //Set rough estimate of sample rate (one sample every x millis)
var numSamples = 50;  //Set number of samples based on sample time in seconds
var splMax = 0; // declare each time

var refspl = 0;
var flag =0;

var temp, light;

var alertlevel = 0; //alert level is the variable that is used to define alert levels.
var tempemailalert = 0; //variable to trigger email from enable IoT
var lightemailalert = 0; //variable to trigger email from enable IoT
/* Alert level logic
Alert level 1 is abnormal light or temp rise. No action, message on screen.
Alert level 2 is sound > threshold. Email user. At alert level 2, light or temp rise is send via email (to enable iot) */


setupbg()


function setupbg() {
    display.clear();
    display.setCursor(0,0);
    display.write('Please set')
    display.setCursor(1,0);
    display.write('background noise.');
    setTimeout(function text1() {
    display.clear();
    display.setCursor(0,0);
    display.write('Click button')
    display.setCursor(1,0);
    display.write('to start...');
        var buttonloop1 = setInterval(function buttonloop2(){
            if (buttonPin.read() == 1) {
                setTimeout(SoundMax,2000); //delay 2.5s before listening to bg noise
                clearInterval(buttonloop1);
            }
        }, 100); //every 0.1 seconds check for button press
    },2000); //display previous message for 2s before proceeding.
}

function SoundMax() {
var count = 0; // declare each time
var sampleloop = setInterval( function samplingloop() {
    getReading();
    display.clear();
    display.setCursor(0,0);
    display.write('Listening...');
    display.setCursor(1,0);
    display.write(count + '/' + numSamples);
    console.log('Reading = ' + reading + ' SPLMax = ' + splMax);
    if (reading > splMax) {
        splMax = reading;
    }
    count = count + 1;
        if(count >= numSamples) {
        display.clear();
        display.setCursor(0,0);
        display.write('Complete');
        display.setCursor(1,0);
        display.write('Noise= ' + splMax + '/ 1023');    
        clearInterval(sampleloop); //If we've reached the maximum number of counts, then stop recording.
        flag = 0;
        refspl = splMax; // write threshold + some margin
        setTimeout(Monitor,2500); //start monitoring
        }
}, sampleRate);
}

function Monitor() {
    display.clear();
    display.setCursor(0,0);
    display.write('Monitoring...');
    alertlevel = 0;
    sendObservation("alertlevel", alertlevel, new Date().getTime());
    var monitorloop = setInterval( function monitoringloop() {
        getReading();
        light = lightPin.value();
        sendObservation("Light", light, new Date().getTime());
        temp = tempPin.value();
        sendObservation("temp", temp, new Date().getTime());
        var ratio = 10*((Math.log(reading/refspl))/(Math.log(10))) //calculate the ratio of refspl (small) and reading (large) in dB.
        console.log(ratio);
        /* Fire alarms must be at least 85 dB loud, a normal conversation or dishwasher should be about 60dB loud. 
        Allowing some margin, trigger at 20dB greater than the background noise.*/
        if (ratio >= 20) {
            display.clear();
            display.setCursor(0,0);
            display.write('Alarm Sounding!');
            display.setCursor(1,0);
            display.write('Click to reset...');
            display.setColor(red,0,0);
            alertlevel = 2; 
            sendObservation("alertlevel", alertlevel, new Date().getTime());
        }
        if (buttonPin.read() > 0) {
            alertlevel = 0;
            display.clear();
            display.setCursor(0,0);
            display.write('Monitoring...');
            display.setColor(red,blue,green);
            sendObservation("alertlevel", alertlevel, new Date().getTime());
        }
    }, sampleRate)
}



function getReading() {
    var buffer = new upmMicrophone.uint16Array(128); //create buffer to store data
    var len = myMic.getSampledWindow(2, 128, buffer);  //fill buffer with sample data
    if (len)
    {
        var thresh = myMic.findThreshold(threshContext, 30, buffer, len); 
        if (thresh)
            reading = thresh;
        //myMic.printGraph(threshContext); - Although very pleasing, suppressed bar graph representation of sound level.
    }
}