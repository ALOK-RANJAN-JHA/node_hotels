// const { uniqueSymbol } = require('lodash/common/common');
const mongoose=require('mongoose');
const uniqueValidator=require('mongoose-unique-validator');
const menuItemSchema=new mongoose.Schema({
    name:{
        type:String,
       unique:true,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    taste:{
        type:String,
        enum:['sweet','spicy','sour'],
        required:true
    },
    is_drink:{
        type:Boolean,
       default:false
    },
    ingrediantes:{
        type:[String],
        default:[]
    },
    num_sale:{
        type:Number,
        default:0
    }
})

menuItemSchema.plugin(uniqueValidator);
const menuItem=mongoose.model('menuItem',menuItemSchema);
module.exports=menuItem;