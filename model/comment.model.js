import mongoose, { model, Schema } from "mongoose";

const commentSchema = new Schema({
    text: { type: String, required: true, trim: true },
    status: {
        type: String,
        enum: ["approved", "pending", "rejected"],
        default: "pending"
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: "Post",
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
});

const Comment = model("Comment", commentSchema);

export default Comment;