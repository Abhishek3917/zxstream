import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        type: {
            type: String,
            enum: ["movie", "Tv"],
            required: true
        },

        filePath: {
            type: String,
            required: true
        },

        fileSize: {
            type: Number
        },

        duration: {
            type: Number
        },

        library: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Library",
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Media = mongoose.model("Media", mediaSchema);

export default Media;