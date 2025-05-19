const express = require("express");
const app=express();
const connection = require("./config/database");
const User = require("./model/user");
app.use( express.json())
app.post("/signup",async(req,res)=>{
    const user=new User(req.body);
   
    try{
        await user.save();
        res.send("user created");
    }
    catch(err){
        
        res.status(500).send(err);
    }
})
//single user
app.get("/users",async(req,res)=>{
    const age=req.body.age;
    try{
        const users=await User.find({age:age});
        res.send(users);
    }
    catch(err){
        res.status(500).send(err);
    }   })
//all users
app.get("/feed",async(req,res)=>{
    
    try{
        const users=await User.find({});
        res.send(users);
    }
    catch(err){
        res.status(500).send(err);
    }   })

    //delete  by age
    app.delete('/users', async (req, res) => {
        const userId = req.body.userId;
    
        try {
            const user = await User.findByIdAndDelete(userId);
           
            res.send("user deleted");
        } catch (err) {
            console.error(err);
            res.status(500).send('Server error: ' + err.message);
        }
    });

    //update

    app.patch('/users/:userId', async (req, res) => {
        const userId = req.params.userId;
        const updateData = req.body;
    
        try {
          
            const AllowedUpdates = ['name', 'password', 'age', 'skills', 'gender'];
            // Check if all keys in updateData are allowed
            const updatallow = Object.keys(updateData).every(k => AllowedUpdates.includes(k));
            // Log the incoming update data for debugging
           
            // If not allowed, return a 400 error
            if (!updatallow) {
                return res.status(400).send("Can't update: Invalid fields");
            }

            if(updateData.skills?.length>5){
                return res.status(400).send("Can't update: skills should be less than 5");
            }


            const user = await User.findByIdAndUpdate(userId,updateData);
           
           //  console.log(user);
            res.send("user updated");
        } catch (err) {
            console.error(err);
            res.status(500).send('Server error: ' + err.message);
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
