const express=require("express");
const database=require("./connect");
const ObjectId=require("mongodb").ObjectId;

let tasksRoutes=express.Router();


//Retrieve all Tasks
tasksRoutes.route("/tasks").get(async(request,response) =>{
    let db=database.getDB();
    let data=await db.collection("tasks").find({}).toArray();
    if(data.length>0){
        response.json(data);
    }else{
        throw new Error("Tasks not found");
    }
})

//Retrieve one
tasksRoutes.route("/tasks/:id").get(async(request,response) =>{
    let db=database.getDB();
    let data=await db.collection("tasks").findOne({_id:new ObjectId (request.params.id)})
    if(Object.keys(data).length>0){
        response.json(data);
    }else{
        throw new Error("Tasks not found");
    }
})

//Create one
tasksRoutes.route("/tasks").post(async(request,response) =>{
    let db=database.getDB();
    let mongoObject={
        name:request.body.name,
        user:request.body.user, 
    }
    let data=await db.collection("tasks").insertOne(mongoObject);
    response.json(data)
})

//Update One 
tasksRoutes.route("/tasks/:id").put(async(request,response) =>{
    let db=database.getDB();
    let mongoObject={
        $set:{
            name:request.body.name,
            user:request.body.user,
        }
    }
    let data=await db.collection("tasks").updateOne({_id:new ObjectId(request.params.id)},mongoObject);
    response.json(data);
})


//Delete one 
tasksRoutes.route("/tasks/:id").delete(async(request,response) =>{
    let db=database.getDB();
    let data=await db.collection("tasks").deleteOne({_id:new ObjectId (request.params.id)})
    response.json(data);
})

module.exports=tasksRoutes;


