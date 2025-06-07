const express = require("express");
const app=express();
const connection = require("./config/database");

const cookieParser=require("cookie-parser");



app.use( express.json())
app.use(cookieParser());

const Userrouter = require("./router/user");
const authrouter = require("./router/auth");
const profilerouter = require("./router/profile");  
const Reqrouter = require("./router/request");
app.use("/", authrouter);
app.use("/", profilerouter);
app.use("/", Reqrouter);
app.use("/",Userrouter);
 
connection().then(() => {
    console.log("Database connected");
    app.listen(8000, () => {
        console.log("port 8000 running");
    });
    
}).catch((err) => {
    console.log("Database connection failed", err);
});
