var ThingSpeakClient = require('thingspeakclient');
var client = new ThingSpeakClient();
var client = new ThingSpeakClient({server:'http://localhost:8000'});
var client = new ThingSpeakClient({useTimeoutMode:false}); 
var client = new ThingSpeakClient({updateTimeout:20000}); 
var yourWriteKey = 'L7ZSFALNGJU3S0KG';
var channelID = 377363;
client.attachChannel(channelID, { writeKey:'yourWriteKey'}, callBack);
//client.updateChannel(channelId, fields, callback);
client.updateChannel(377363, {field1: 7, field2: 6}, function(err, resp) {
    if (!err && resp > 0) {
        console.log('update successfully. Entry number was: ' + resp);
    }
});

function callBack(err, resp)
{
    if (!err && resp > 0) {
        console.log('Successfully. response was: ' + resp);
    }
    else {
      console.log(err);
    }
}