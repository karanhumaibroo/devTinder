const express= require("express");

const app=express();

//only one http that is given
app.get("/user",(req,res)=>{
    res.send("data accesed")
})
app.post("/user",(req,res)=>{
    res.send("data posted")
})
app.delete("/user",(req,res)=>{
    res.send("deleted")
})

app.put("/user",(req,res)=>{
    res.send("put")
})
//this will run for all http request
app.use("/user",(req,res)=>{
    res.send("no extend")
})


app.listen("8000",()=>{
    console.log("port 8000 run")
})