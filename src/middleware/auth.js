const jwt = require('jsonwebtoken');
const User = require('../model/user'); // Adjust the path as needed
const userauth = async(req, res, next) => {
   
   try {
    const token = req.cookies.token;
      if (!token) {
        return res.status(401).send('Access denied. No token provided.');
      }
      // Verify token
      const decoded = jwt.verify(token, 'dev#tinder2344');
      // Find user by ID from token
      const user = await User.findById(decoded._id).select('-password'); // exclude password field
      if (!user) {
        return res.status(404).send('User not found');
      }
      req.user = user; // attach user to request object
      next(); // proceed to the next middleware or route handler
    } catch (err) {
        res.status(400).send('Error: ' + err.message);
    }
}
module.exports = { userauth };