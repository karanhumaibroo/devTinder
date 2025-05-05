const express= require("express");

const app=express();


//this will run for all http request
app.use("/user",(req,res,next)=>{
    next();
},
[(req,res,next)=>{
      //  res.send("2nd req")
      next()
},
(req,res,next)=>{
   // res.send("no 3 extend")
   next();
}],
(req,res)=>{
    res.send("no extend")
}

)


app.listen("8000",()=>{
    console.log("port 8000 run")
})