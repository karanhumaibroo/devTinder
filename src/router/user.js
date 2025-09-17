const express=require("express");
const Userrouter=express.Router();
const { userauth } = require("../middleware/auth");
const coonectionreq = require("../model/connection");
const User = require("../model/user");
const { connection } = require("mongoose");
const INFO_NEED="name age gender about photourl skills";
Userrouter.get("/user/request", userauth, async (req, res) => {
    try {
        const userId = req.user._id;
        const requests = await coonectionreq.find({ toUserid: userId, status: "interested" }).populate("fromUserid",INFO_NEED);
       
        res.status(200).json({
            message: "Connection requests fetched successfully",
            requests: requests
        });
    }
 catch(err){
    res.status(400).send("Error fetching connection requests: " + err.message);
 }
})
Userrouter.get("/user/connection", userauth, async (req, res) => {
    try {
        const userId = req.user._id;
        const connections = await coonectionreq.find({ $or: [{ fromUserid: userId,status:"accepted" }, { toUserid: userId ,status:"accepted"}] }).populate("fromUserid", INFO_NEED).populate("toUserid", INFO_NEED);
        const data= connections.map((row)=>{
            if(row.fromUserid._id.toString()===userId.toString()){
             return row.toUserid
        }
     return row.fromUserid;
    })
    res.status(200).json({
        message: "Connections fetched successfully", 
        data: data  
    })}
    catch(err){
        res.status(400).send("Error fetching connections: " + err.message);
    }})

Userrouter.get("/feed", userauth, async (req, res) => {
 try{
 
    const user=req.user;
    const page=parseInt(req.query.page) || 1;
    let limit=parseInt(req.query.limit) || 10;
    limit=limit>50? 50 : limit;
    const skip=(page-1)*limit;
    const connectionReq=await coonectionreq.find({
        $or:[
            {fromUserid:user._id},
            {toUserid:user._id}
        ]}
    ).select("fromUserid toUserid");
    const hidedata=new Set();
    connectionReq.forEach((row)=>{
        if(row.fromUserid.toString()===user._id.toString()){
            hidedata.add(row.toUserid.toString());
        }else{
            hidedata.add(row.fromUserid.toString());
        }
    });
    const connections=await User.find({
        $and:[
            {_id:{$ne:user._id}},
            {_id:{$nin:Array.from(hidedata)}}
        ]
    }).select(INFO_NEED).skip(skip).limit(limit);
    res.status(200).json({
        connections: connections,
        message: "Feed fetched successfully"
    })
 }
 catch(err){
    res.send(err.message);
 }
});
module.exports = Userrouter;