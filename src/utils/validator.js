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

module.exports = check;
