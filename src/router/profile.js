const express=require("express");
const profilerouter=express.Router();
const { userauth } = require("../middleware/auth");
profilerouter.get('/profile',userauth, async (req, res) => {
    try {
     const user=req.user; // Assuming user is set in a previous middleware
      res.send(user);
    } catch (err) {
      console.error(err);
      res.status(400).send('Invalid token');
    }
  });

module.exports=profilerouter;