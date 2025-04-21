import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    link:{
        type: String,
        required: true,
    },
    type:{
        type: String,
        required: true,
    },
    tags:[{
        type: mongoose.Types.ObjectId,
        ref: "Tag",
    }],
    userId:{
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    }
},{ timestamps: true });

const Content = mongoose.model("Content", contentSchema);

export default Content;