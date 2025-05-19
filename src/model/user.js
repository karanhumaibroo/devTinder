const mongoose = require("mongoose");

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
    },
    password: {
        type: String,
        min: 6,
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

const User = mongoose.model("User ", userSchema);
module.exports = User;
