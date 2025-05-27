const express=require("express");
const Reqrouter=express.Router();
const { userauth } = require("../middleware/auth");

Reqrouter.get('/sendcoonectionrequest',userauth, async (req, res) => {
    try {
        const user = req.user; // Assuming user is set in a previous middleware
        console.log("User name:", user.name);
        // Here you can implement the logic to send a connection request

        res.send("Connection request sent successfully");
    } catch (err) {
        console.error(err);
        res.status(400).send('Error sending connection request');
    }
})

module.exports=Reqrouter;