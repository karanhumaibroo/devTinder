const express = require("express");
const app=express();
// Apply auth middleware to /auth routes

app.get("/auth", (req, res) => {
    //try{
        throw new Error("wwfefe");
        
        res.send("auth xx verify");
    //}
 //  catch(err){
  //      res.send("contact support")
  // }
});

app.use("/",(err,req,res,next)=>{
    if(err){
        res.status(500).send("contact support")
    }
})
app.listen(8000, () => {
    console.log("port 8000 running");
});
