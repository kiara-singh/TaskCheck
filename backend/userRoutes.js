const express=require("express");
const database=require("./connect");
const ObjectId=require("mongodb").ObjectId;
const bcrypt=require("bcrypt");
let userRoutes=express.Router();
const SALTROUNDS=6;


//Retrieve all users
userRoutes.route("/users").get(async(request,response) =>{
    let db=database.getDB();
    let data=await db.collection("users").find({}).toArray();
    if(data.length>0){
        response.json(data);
    }else{
        throw new Error("users not found");
    }
})

//Retrieve one
userRoutes.route("/users/:id").get(async(request,response) =>{
    let db=database.getDB();
    let data=await db.collection("users").findOne({_id:new ObjectId (request.params.id)})
    if(Object.keys(data).length>0){
        response.json(data);
    }else{
        throw new Error("users not found");
    }
})

//Create one
userRoutes.route("/register").post(async(request,response) =>{
    let db=database.getDB();

    console.log("Received request to /users/register with body:", request.body);

    //check if user already exsits 
    try{
        const userEmail=await db.collection("users").findOne({email: request.body.email});
        if(userEmail){
            return response.status(400).json({message: "Email in use"});
        //create new user 
        }else{
            const hashed=await bcrypt.hash(request.body.password,SALTROUNDS);
            let mongoObject={
                username:request.body.username,
                email:request.body.email,
                password:hashed,
                tasks:[], 
            };
            let data=await db.collection("users").insertOne(mongoObject);
            console.log("Inserted Data: ", data);
            response.json(data);
        } 
    }catch (err){
        console.error(err);
        response.status(500).json({message: "Internal server error"});
    }
})

//Update One 
userRoutes.route("/users/:id").put(async(request,response) =>{
    let db=database.getDB();
    let mongoObject={
        name:request.body.name,
        email:request.body.email,
        password:request.body.password,
        tasks:request.body.tasks, 
    }
    let data=await db.collection("users").updateOne({_id:new ObjectId(request.params.id)},mongoObject);
    response.json(data);
})


//Create one
userRoutes.route("/register").post(async(request,response) =>{
    let db=database.getDB();

    console.log("Received request to /users/register with body:", request.body);

    //check if user already exsits 
    try{
        const userEmail=await db.collection("users").findOne({email: request.body.email});
        if(userEmail){
            return response.status(400).json({message: "Email in use"});
        //create new user 
        }else{
            const hashed=await bcrypt.hash(request.body.password,SALTROUNDS);
            let mongoObject={
                username:request.body.username,
                email:request.body.email,
                password:hashed,
                tasks:[], 
            };
            let data=await db.collection("users").insertOne(mongoObject);
            console.log("Inserted Data: ", data);
            response.json(data);
        } 
    }catch (err){
        console.error(err);
        response.status(500).json({message: "Internal server error"});
    }


  
})

module.exports=userRoutes;


