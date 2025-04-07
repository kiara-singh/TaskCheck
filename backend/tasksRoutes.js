const express=require("express");
const database=require("./connect");
const { AuthMechanism } = require("mongodb");
const ObjectId=require("mongodb").ObjectId;
const jwt=require("jsonwebtoken");
require("dotenv").config({path:"./config.env"});

let tasksRoutes=express.Router();


//Retrieve all Tasks
tasksRoutes.route("/tasks").get(tokenVerify, async(request,response) =>{
    let db=database.getDB();
    let data=await db.collection("tasks").find({}).toArray();
    if(data.length>0){
        response.json(data);
    }else{
        throw new Error("Tasks not found");
    }
})

//Retrieve one
tasksRoutes.route("/tasks/:id").get(tokenVerify, async(request,response) =>{
    let db=database.getDB();
    let data=await db.collection("tasks").findOne({_id:new ObjectId (request.params.id)})
    if(Object.keys(data).length>0){
        response.json(data);
    }else{
        throw new Error("Tasks not found");
    }
})

//Create one
tasksRoutes.route("/tasks").post(tokenVerify, async(request,response) =>{
    let db=database.getDB();
    console.log(request);
    let mongoObject={
        name:request.body.name,
        user:request.body.user._id, 
    }
    let data=await db.collection("tasks").insertOne(mongoObject);
    response.json(data)
    console.log(response);
})

//Update One 
tasksRoutes.route("/tasks/:id").put(tokenVerify, async(request,response) =>{
    let db=database.getDB();
    let mongoObject={
        $set:{
            name:request.body.name,
            user:request.body.user,
        }
    }
    console.log(mongoObject);
    let data=await db.collection("tasks").updateOne({_id:new ObjectId(request.params.id)},mongoObject);
    response.json(data);
})


//Delete one 
tasksRoutes.route("/tasks/:id").delete(tokenVerify, async(request,response) =>{
    let db=database.getDB();
    let data=await db.collection("tasks").deleteOne({_id:new ObjectId (request.params.id)})
    response.json(data);
})

function tokenVerify(request, response, next) {
    console.log(request);
    const authHeaders = request.headers["authorization"];
    const token = authHeaders && authHeaders.split(' ')[1];
    if (!token) {
        return response.status(401).json({message: "Authentication token is missing"});
    }
    jwt.verify(token, process.env.SECRETKEY, (error, user) => {
        if (error) {
            return response.status(403).json({message: "Invalid Token"});
        }
        if (!request.body) {
            request.body = {};
          }
        request.body.user = user;
        next();
    })
}


module.exports=tasksRoutes;


