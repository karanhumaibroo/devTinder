const mongoose=require("mongoose");
const connectionreq=new mongoose.Schema({
    toUserid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User ",
        required: true
    },
    fromUserid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User ",
        required: true
    },
    status: {
        type: String,
        enum: [ "interested", "ignored","accepted","rejected",],
        
    },
    },
{
    timestamps: true,   
})

connectionreq.index({ toUserid: 1, fromUserid: 1 });
connectionreq.pre("save",  function (next) {
    const Connectionrequest = this;
    if(Connectionrequest.fromUserid.equals(Connectionrequest.toUserid)) {
        throw new Error("You cannot send a connection request to yourself");
    }
    next();
})

const Connection = mongoose.model("Connection", connectionreq);
module.exports = Connection;