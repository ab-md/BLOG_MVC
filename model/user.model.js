import { model, Schema } from "mongoose";

const userSchema = new Schema({
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String, default: "/uploads/images/users/profile.jpeg" },
    role: {
        type: String,
        enum: ["admin", "author", "user"],
        default: "user"
    }
}, {
    timestamps: true,
    versionKey: false
});

const User = model("User", userSchema);

export default User;