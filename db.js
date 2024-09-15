// const { default: mongoose } = require('mongoose');
const mongoose=require('mongoose');
require('dotenv').config();
const mongodbUrl=process.env.MOGODB_URL;
// define the mongodb connection url
// local url
// const mongoUrl='mongodb://localhost:27017/hotels'//where hotels is databases name
// global url
const mongoUrl=MOGODB_URL;

// set up mongodb connection
mongoose.connect(mongoUrl
    // ,{ useNewUrlParser:true,
    // useUnifiedTopology:true
    // }
)

// get the default connections
// mongoose maintains a default connections object representing the mongodb connections
const db=mongoose.connection;

// define an event listeners for the database connetions
db.on('connected',()=>{
    console.log("connected to MongoDB server");
});
db.on('error',(err)=>{
    console.log("MongoDB connection error",err);
});
db.on('disconnected',()=>{
    console.log("MongoDB disconnected");
});

// export the database connection
module.exports=db;