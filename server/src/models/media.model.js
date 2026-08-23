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
        year: {
            type: Number
        },
        season: {
            type: Number
        },

        episode: {
            type: Number
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
        },
        video: {
            codec: String,
            width: Number,
            height: Number,
            bitrate: Number,
            frameRate: String
        },
        audio: [
            {
                codec: String,
                language: String,
                channels: Number
            }
        ],

        subtitles: [
            {
                language: String
            }
        ],
    },
    {
        timestamps: true
    },
);

mediaSchema.index(
    { library: 1, filePath: 1 },
    { unique: true }
);

const Media = mongoose.model("Media", mediaSchema);

export default Media;