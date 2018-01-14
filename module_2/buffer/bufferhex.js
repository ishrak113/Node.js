

 

// print the buf in hex format.  
var bb= new Buffer(26);
for(i=0;i<26;i++){
    bb[i]=97+i;
    
}

var p='';
for(i=0;i<26;i++){
    p+= '0x'+bb[i].toString(16)+' ';
}

console.log(p);

buf = new Buffer(26);
for (var i = 0 ; i < 26 ; i++) {
  buf[i] = i + 97;
}
for (var j=1; j<27; j++){
    console.log( "0x" + buf.toString('hex',(j-1),j));  //buf.toString([encoding][, start][, end])
}