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
const express =require('express');
const app=express();

// connect to databases
const db=require('./db');

// make person model and perform all operation with this person 
const Person=require('./modules/person');
const menuItem=require('./modules/menuItem');

const bodyParser=require('body-parser');
app.use(bodyParser.json()); //req.body


app.get('/',function (req,res){
   res.send("welcome to the resturant");
});


// menuItem
app.post('/menu',async(req,res)=>{
    try{
        const data=req.body;
        const newMenu=new menuItem(data);
        const response=await newMenu.save();
        console.log('data saved successfully');
        res.status(200).json(response);

    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Error'});
    }
});

app.get('/menu',async(req,res)=>{
    try{
        const data=await menuItem.find();
        console.log('data fatched');
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Error'});
    }
})


// import router files
const personRoutes=require('./routes/personRoutes');
const menuRoutes=require('./routes/menuRoutes');
// use the router
app.use('/person',personRoutes);
app.use('/menu',menuRoutes);

app.listen(3000,()=>{
    console.log("server is listening at 3000")
});