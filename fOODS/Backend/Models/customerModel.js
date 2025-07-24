import mongoose from "mongoose";

const CustomerSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }


},{
    timestamps:true
})

const customerModel =mongoose.model("custpmer",CustomerSchema)

export default customerModel