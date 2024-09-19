const express=require('express');
const router=express.Router();
// make person model and perform all operation with this person 
const Person=require('./../modules/person');

// post rout to add person
router.post('/',async(req,res)=>{
    
    try{
        const data=req.body //assuming the request body contained the person data
    
        // create a new person document using mongoose model
        const newPerson=new Person(data);

        // save the new person to the database
        const response= await newPerson.save();
        console.log('data saved');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'internal server error'});
    }
   
});

// get rout to get person data
router.get('/',async(req,res)=>{
    try{
        const data= await Person.find();
        console.log('data fetched');
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'internal server error'});
    }
});
router.get('/:worktype',async(req,res)=>{
    try{
        const workType=req.params.worktype //exact the work type from the url parameter
        if(workType=='chef'||workType=='waiter'||workType=='manager'){
            const response=await Person.find({work:workType});
            console.log('response fatched');
            res.status(200).json(response);
        }
        else{
            res.status(404).json({error:'Invalid WorkType'});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Error'});
    }
});

router.put('/:id',async(req,res)=>{
    try{
        const personId=req.params.id //extract the id from the url parameter
        const updatedPersonData=req.body //updated data for the person
        const response=await Person.findByIdAndUpdate(personId,updatedPersonData,{
            new:true,       //return the updated document
            runValidators:true, //run mongooes validation
        });
        if(!personId){
            return  res.status(404).json({error:'Person Not Found'});
        }
        console.log('Data Updated');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Error'});
    }
});

router.delete('/:id',async(req,res)=>{
    try{
        const personId=req.params.id //extract the id from the url parameter
        const response=await Person.findByIdAndDelete(personId);
        if(!personId){
            return  res.status(404).json({error:'Person Not Found'});
        }
        console.log('Data Deleted succesfully');
            res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Error'});
    }
    
});

module.exports=router;