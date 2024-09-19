// function callback(){
//     console.log("callback function called");
// };
// var add =(a,b,callback)=>{
//    console.log("calculating..");
//    callback();
// };
// add(2,3,function(){
//     console.log("callback function called");
// });
// add(3,4,()=>{console.log("callback function called")});

// const { json } = require("express");


// import
// const note=require('./notes.js');
// console.log("server file is available");
// console.log(note.age);
// var res=note.addNumber(2,4);
// console.log(res);

// var _=require('lodash');
// var data=["person",1, "person",1, 2, 2 , 'alok','ranjan','Alok'];
// var filter=_.uniq(data);
// console.log(filter);
// console.log(_.isString(data[1]));
// console.log('module');


//      JSON to object
// const jsonString='{"name":"alok","age":20,"hobbies":["play","movie"]}';
// const jsonObject=JSON.parse(jsonString);//convert json into object 
// console.log(jsonObject.hobbies);

//      object to JSON
// const jsonObject={
//     name:'alok',
//     age:20,
//     hobbies:['play','movies']
// }
// const jsonString=JSON.stringify(jsonObject);
// console.log(jsonString);

//  creating a server
const express = require('express');
const app = express();

// connect to databases
const db = require('./db');

require('dotenv').config();
const PORT = process.env.PORT || 3000;

// middileware added
const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`);
    next(); //move on to the next phase
}

const passport = require('./auth');
app.use(passport.initialize());

const bodyParser = require('body-parser');
app.use(bodyParser.json()); //req.body

app.use(logRequest);

const localAuthMiddleware = passport.authenticate('local', { session: false });
app.get('/', localAuthMiddleware, function (req, res) {
    res.send("welcome to the resturant");
});

// app.get('/login', localAuthMiddleware, function (req, res) {
//     res.send("welcome to Our hotel website");
// });



// import router files
const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuRoutes');
const SignUpRoutes = require('./routes/SignUpRoutes');
// use the router
app.use('/person',localAuthMiddleware, personRoutes);
app.use('/menu', menuRoutes);
app.use('/',SignUpRoutes);

app.listen(3000, () => {
    console.log("server is listening at 3000")
});