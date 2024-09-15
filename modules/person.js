
const { uniqueId } = require('lodash');
const mongoose=require('mongoose');
const uniqueValidator=require('mongoose-unique-validator');
// define person schema
const personSchema= new mongoose.Schema({

    name :{
        type:String,
        required:true
    },
    age:{
        type:String
    },
    work:{
        type:String,
        enum:['chef','waiter','manager'],
        required:true
    },
    mobile:{
        type:Number,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    address:{
        type:String
    },
    salary:{
        type:Number,
        required:true
    }
});

personSchema.plugin(uniqueValidator);
// create person model
const Person =mongoose.model('Person',personSchema);
module.exports=Person;