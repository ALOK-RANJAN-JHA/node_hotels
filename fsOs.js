var fs= require('fs');
var os= require('os');
 var user = os.userInfo();
 console.log(user);
 console.log(user.username);
 fs.appendFile("greate.txt "," Hi "+user.username +" welcome\n",()=>{
    console.log("file is created");
 });
 console.log(fs)