const express = require("express");
const app=express();
const connection = require("./config/database");
const User = require("./model/user");
app.post("/user",async(req,res)=>{
    const user=new User({
       name:"adarsh",
        email:"ajsjjd@gmail.com",
    });
    try{
        await user.save();
        res.send("user created");
    }
    catch(err){
        
        res.status(500).send(err);
    }
})

connection().then(() => {
    console.log("Database connected");
    app.listen(8000, () => {
        console.log("port 8000 running");
    });
    
}).catch((err) => {
    console.log("Database connection failed", err);
});
