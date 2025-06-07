const express=require("express");
const Reqrouter=express.Router();
const { userauth } = require("../middleware/auth");
const Connection = require("../model/connection");
const User = require("../model/user");

Reqrouter.post('/request/send/:status/:toUserid',userauth, async (req, res) => {
    try {
        const fromUserid = req.user._id; // Assuming user is set in a previous middleware
        const toUserid = req.params.toUserid;
      
        const status = req.params.status;
        if (!["ignored", "interested"].includes(status)) {
            return res.status(400).send('Invalid status');
        }
          
        const userfind= await User.findById(toUserid);
        if (!userfind) {
            return res.status(404).send('User not found');
        }
        const existingConnection = await Connection.findOne({
           $or: [
                { fromUserid, toUserid},
                { fromUserid: toUserid, toUserid: fromUserid }
            ]
          
        });
        if (existingConnection) {
            return res.status(400).send('Connection request already exists');
        }
      const connection = new Connection({
            toUserid: toUserid,
            fromUserid: fromUserid,
            status: status
        });
        const data = await connection.save();
        if (!data) {
            return res.status(400).send('Error saving connection request');
        }

        res.send("Connection request sent successfully");
    } catch (err) {
        console.error(err);
        res.status(400).send('Error sending connection request');
    }
})

Reqrouter.post("/request/review/:status/:reqid", userauth, async (req, res) => {
  
  try{
    const { status, reqid } = req.params;
    const userId = req.user._id;
    const validationstatus=["accepted","rejected"];
    if(!validationstatus.includes(status)){
        return res.status(400).send("Invalid status");
    };
    const connection = await Connection.findOne(
        {
            _id: reqid,
            toUserid: userId,
            status: "interested",
        }

    );
    if (!connection) {
        return res.status(404).send("Connection request not found or already processed");
    }
    connection.status = status;
    const updatedConnection = await connection.save();
    if (!updatedConnection) {
        return res.status(400).send("Error updating connection request");
    }
    res.json({
        message: "Connection request updated successfully", updatedConnection
    });
  }
  catch(err){
    console.error(err);
    return res.status(400).send("Error in request");
  }
})

module.exports=Reqrouter;