const express= require("express");

const app=express();
app.use("/heyy",(req,res)=>{
    res.send("heyy")
})
app.use("/hello",(req,res)=>{
    res.send("hello")
})
app.use("/",(req,res)=>{
    res.send("no extend")
})



app.listen("8000",()=>{
    console.log("port 8000 run")
})