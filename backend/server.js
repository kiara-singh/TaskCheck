const connect=require("./connect");
//installing library
const express=require("express");
const cors=require("cors");
const tasks=require("./tasksRoutes");

//declare express app
const app=express();
const PORT=3000

//mounts middleware
app.use(cors());
app.use(express.json());
app.use(tasks);

//creates server 
connect.connectToServer().then(() => {
    app.listen(PORT, () => {
        console.log("Server running on http://localhost:" + PORT);
    });
}).catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
});