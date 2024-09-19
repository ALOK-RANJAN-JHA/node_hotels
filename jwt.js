const jwt=require('jsonwebtoken');

const jwtAuthMiddleware=(req,res,next)=>{

    const authorization=req.headers.authorization;
    if(!authorization)return res.status(401).json({error:`Token not Found`});

    // extract the jwt token fron the req header
    const token=req.headers.authorization.split(' ')[1];
    if(!token)return res.status(404).json({error:`unauthorized`});

    try{
        // verify  the jwt token
        const decoded=jwt.verify(token,process.env.JWT_SECRET);

        // Attach the user information to the request object
        req.user=decoded
        next();
    }catch(err){
        console.log(err);
        res.status(401).json({error:`Invalid Token`});
    }
}

// function to generate jwt token 
const generateToken=(userData)=>{
    // generate a new JWT token using user data
    return jwt.sign(userData,process.env.JWT_SECRET,/*{expiresIn:30}*/);
}
module.exports={jwtAuthMiddleware,generateToken};