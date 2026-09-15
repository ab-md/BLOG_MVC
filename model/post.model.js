import mongoose, { model, Schema } from "mongoose";

const postSchema = new Schema({
    title: {type: String, required: true, trim: true},
    text: { type: String, required: true, trim: true },
    slug: {type: String, required: true, trim: true},
    image: {type: String, default: "/uploads/images/posts/post.jpeg"},
    status: {
        type: String,
        enum: ["published", "draft"],
        default: "draft"
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
});

const Post = model("Post", postSchema);

export default Post;