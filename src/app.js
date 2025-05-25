const express = require("express");
const app=express();
const connection = require("./config/database");
const User = require("./model/user");
const cookieParser=require("cookie-parser");
const check=require("./utils/validator");
const jwt=require("jsonwebtoken");
const { userauth } = require("./middleware/auth");
app.use( express.json())
app.use(cookieParser());
const bcrypt = require('bcrypt');
const e = require("express");
// Adjust path as needed



app.post('/signup', async (req, res) => {
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

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(401).send("Invalid email or password");
        }

        // Compare password with hashed password   
        const isMatch = await bcrypt.compare(password, user.password);
        if(isMatch){
            const token=await jwt.sign({ _id: user._id },"dev#tinder2344",{expiresIn:"1h"});
            // Set a cookie with the user ID
            res.cookie('token', token,{expires: new Date(Date.now() + 3600000)});
            
            console.log("Cookie set:");
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

app.get('/profile',userauth, async (req, res) => {
    try {
     const user=req.user; // Assuming user is set in a previous middleware
      res.send(user);
    } catch (err) {
      console.error(err);
      res.status(400).send('Invalid token');
    }
  });


 
connection().then(() => {
    console.log("Database connected");
    app.listen(8000, () => {
        console.log("port 8000 running");
    });
    
}).catch((err) => {
    console.log("Database connection failed", err);
});
