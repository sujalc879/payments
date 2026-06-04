import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new Schema({
    email : {
        type : String,
        unique : true,
        required : true
    }, 
    password : {
        type : String,
        required : true
    },
    firstName : String,
    lastName : String
}, {
    timestamps : true
});

const accountSchema = new Schema({
    userId : {
        type : ObjectId,
        ref : "users",
        required : true
    },
    balance : Number
});

export const userModel = mongoose.model("users", userSchema);
export const accountModel = mongoose.model("accounts", accountSchema);