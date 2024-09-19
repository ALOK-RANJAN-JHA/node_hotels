const express=require('express');
const router=express.Router();
const SignUP=require('./../modules/SignUP');
const {jwtAuthMiddleware,generateToken}=require('./../jwt');
router.post('/signup',async(req,res)=>{
    
    try{
        const data=req.body //assuming the request body contained the person data
    
        // create a new person document using mongoose model
        const newSignUp=new SignUP(data);

        // save the new person to the database
        const response= await newSignUp.save();
        console.log('data saved');

        const payload={
            id:response.id,
            username:response.username
        }
        const token=generateToken(payload);
        console.log(JSON.stringify(payload));
        console.log("token is :" ,token);

        res.status(200).json({response:response,token:token});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'internal server error'});
    }
   
});

// login Routes
router.post('/login',async(req,res)=>{
    try{
        // Extract username and password from the request body;
        const {username, password}=req.body;

        // find the user by username
        const user= await SignUP.findOne({username:username});

        // if user does not exist or password does not match , return error
        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({error:'Invalid username or password'});
        }

        // generate token
        const payload={
            id:user.id,
            username:user.username
        }
        const token=generateToken(payload);
        // return the token as response
        res.json({token});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:` Internal server error`});
    }
});

// profile Routes
router.get('/profile',jwtAuthMiddleware,async(req,res)=>{
    try{
        const userData=req.user;
        console.log("user Data : ",userData);

        const userId=userData.id;
        const newuser= await SignUP.findById(userId);
        res.status(200).json({newuser});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:` Internal server error`});
    }
})
module.exports=router;