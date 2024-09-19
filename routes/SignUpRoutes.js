const express=require('express');
const router=express.Router();
const SignUP=require('./../modules/SignUP');
router.post('/signup',async(req,res)=>{
    
    try{
        const data=req.body //assuming the request body contained the person data
    
        // create a new person document using mongoose model
        const newSignUp=new SignUP(data);

        // save the new person to the database
        const response= await newSignUp.save();
        console.log('data saved');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'internal server error'});
    }
   
});
module.exports=router;