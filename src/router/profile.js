const express=require("express");
const profilerouter=express.Router();
const bcrypt = require('bcrypt');
const {checkEdit}  = require("../utils/validator");
const cookieParser=require("cookie-parser");
const { userauth } = require("../middleware/auth");
const User = require("../model/user");
//const connection=require("../model/connection");
profilerouter.use(cookieParser());
profilerouter.get('/profile/view',userauth, async (req, res) => {
    try {
     const user=req.user; // Assuming user is set in a previous middleware
      res.send(user);
    } catch (err) {
      console.error(err);
      res.status(400).send('Invalid token');
    }
  });
profilerouter.patch('/profile/update',userauth, async (req, res) => {

  try{
  if (!checkEdit(req)) {
    return res.status(400).send('Invalid fields for update');
  }
   // Assuming user is set in a previous middleware
  const user = req.user; // Assuming user is set in a previous middleware
   Object.keys(req.body).forEach((key) => {
    user[key] = req.body[key];
  });
  await user.save();
  res.status(200).send('Profile updated successfully');
  }
  catch(err){
    console.error(err);
    res.status(400).send('Invalid edit request');
  }
})

profilerouter.patch('/profile/updatepassword', userauth, async (req, res) => {
  try {
    const user = req.user;
    const { oldPassword, newPassword } = req.body;
     // Assuming user is set in a previous middleware
     
    // Validate the old password
    const isMatch = await user.toValidatepassword(oldPassword);
    if (isMatch) {
    // Hash the new password
    const newpasshash = await bcrypt.hash(newPassword, 10);
    user.password = newpasshash; // Update the password with the new hash


    // Save the updated user
    await user.save();


    res.status(200).send('Password updated successfully');}
    else {
      return res.status(401).send('Old password is incorrect');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error: ' + err.message); // Changed to 500 for server errors
  }
});


module.exports=profilerouter;