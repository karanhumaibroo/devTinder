const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 100,
        min: 3,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
       validate(value) {
            if (!validator.isEmail(value)) {
               throw new Error("email not valid");
           }
        },
    },
    password: {
        type: String,
        min: 6,
       validate(value) {
           if(!validator.isStrongPassword(value)){
                throw new Error("password not strong");
           }}
    },
    age: {
        type: Number,
        min: 16,
        max: 100,
    },
    gender: {
        type: String,
        validate(value){
            if(!["male","female","other"].includes(value)){
                throw new Error("gender not valid");
                runValidators: true;
           }}
    },
    photourl: {
        type: String,
        validate(value) {
            if (!validator.isURL(value)) {
                throw new Error("photo url not valid");
            }
        }
    },
    about: {
        type: String,
        default: "about me",
    },
    skills: {
        type: [String],
        default: ["skill1", "skill2"],
    },
}, {
    timestamps: true,
});
userSchema.methods.getjwt=async function () {
    const user = this;
    const token = await jwt.sign({ _id: user._id }, "dev#tinder2344", { expiresIn: "7d" });
    return token;
}
userSchema.methods.toValidatepassword = async function (passwordinputbyuser) {
    const user = this;
    const isMatch = await bcrypt.compare(passwordinputbyuser, user.password);
    return isMatch;
}
const User = mongoose.model("User ", userSchema);
module.exports = User;
