const validator = require("validator");

const check = (req) => {
  const { name, email, password } = req.body;

  if (!name) {
    throw new Error("Name not provided");
  }
  if (!email) {
    throw new Error("Email not provided");
  }
  if (!validator.isEmail(email)) {
    throw new Error("Email not valid");
  }
  if (!password) {
    throw new Error("Password not provided");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error("Password not strong");
  }
};
const checkEdit = (req) => {
  const userupdate=["name", "email", "about","age","gender","photourl","skills",];
  const keys = Object.keys(req.body).every((fields) => {
  return  userupdate.includes(fields);
    
  })
 return keys;
}

module.exports = {check,checkEdit};
