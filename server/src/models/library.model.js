import mongoose from "mongoose";

const libraryschema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    type:{
        type:String,
        enum:["movie","tv"],
        required:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    path:{
        type:String,
        required:true
    },
},
    {timestamps:true},
)

const Library = mongoose.model("Library",libraryschema);

export default Library