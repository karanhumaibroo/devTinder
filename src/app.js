const express = require("express");
const { auth, userauth } = require("./middleware/auth");
const app = express();
// Apply auth middleware to /auth routes
app.use("/auth", auth);
app.get("/auth/xyz", (req, res) => {
    res.send("auth verify");
});
app.get("/auth/xx", (req, res) => {
    res.send("auth xx verify");
});
// Apply userauth middleware to /user routes
app.get("/user/xyz", userauth, (req, res) => {
    res.send("user auth verify");
});
app.listen(8000, () => {
    console.log("port 8000 running");
});
