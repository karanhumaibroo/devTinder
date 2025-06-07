const express=require("express");
const authrouter=express.Router();
const {check}=require("../utils/validator");
const User = require("../model/user");
const cookieParser=require("cookie-parser");
const bcrypt = require('bcrypt');
authrouter.use(cookieParser());
authrouter.post('/signup', async (req, res) => {
  try {
    check(req); // Validate input using the check function
    const { name, email, password } = req.body;

    // Validate input
    

    // Hash the password
    const passhash = await bcrypt.hash(password, 10);
    console.log("Hashed password:", passhash);

    // Create user instance
    const user = new User({
      name,
      email,
      password: passhash,
    });

    // Save to database
    await user.save();

    res.status(201).send("User  created successfully");
  } catch (err) {
    console.error(err);

    // Handle duplicate email error (MongoDB duplicate key error)
    if (err.code === 11000) {
      return res.status(409).send("Email already exists");
    }

    res.status(500).send("Server error: " + err.message);
  }
});

authrouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(401).send("Invalid email or password");
        }

        // Compare password with hashed password   
        const isMatch = await user.toValidatepassword(password);
        if(isMatch){
            const token=await user.getjwt();
            // Set a cookie with the user ID
            res.cookie('token', token,{expires: new Date(Date.now() + 3600000)});
            
          //  console.log("Cookie set:");
        }
      
        if (!isMatch) {
            return res.status(401).send("Invalid email or password"); 
        } else {
            res.status(200).send("Login successful");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error: " + err.message);
    }
});

authrouter.post("/logout", async (req, res) => {
    try {
        // Clear the cookie by setting its expiration date to the past
        res.cookie('token', null, { expires: new Date(0) });
        res.status(200).send("Logout successful");
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error: " + err.message);
    }
})

module.exports=authrouter;