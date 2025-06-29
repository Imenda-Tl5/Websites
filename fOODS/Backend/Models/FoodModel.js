import mongoose from "mongoose";

const foodSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },

    category:{
        type:String,
        required:true
    },

    price:{
        type:Number,
        required:true
    },
    count:{
        type:Number,
        required:true
    }


},{
    timestamps:true
})

const foodModel =mongoose.model("Food",foodSchema)

export default foodModel