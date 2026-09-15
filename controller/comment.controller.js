import Comment from "../model/comment.model.js";
import Post from "../model/post.model.js";

const createComment = async (req, res, next) => {
    try {
        const { text } = req.body;
        const { postSlug } = req.params;
        const post = await Post.findOne({slug: postSlug});
        if (!text || text === undefined) {
            req.flash("errors", [{
                text: "Comment body can not be empty"
            }]);
            return res.redirect(`/posts/${postSlug}`);
        }
        const initialData = {
            text,
            status: "pending",
            user: req.user.id,
            post: post._id
        }
        await Comment.create(initialData);
        req.flash("messages", {success: "Your comment is sent to admins"});
        return res.redirect(`/posts/${postSlug}`);
    } catch (error) {
        next(error);
    }
}

const approveComment = async (req, res, next) => {
    try {
        const {id} = req.params;
        await Comment.findByIdAndUpdate(id,{
            $set: {status: "approved"}
        });
        return res.redirect("/admin/comments");
    } catch (error) {
        next(error);
    }
}

const rejectComment = async (req, res, next) => {
    try {
        const {id} = req.params;
        await Comment.findByIdAndUpdate(id,{
            $set: {status: "rejected"}
        });
        return res.redirect("/admin/comments");
    } catch (error) {
        next(error);
    }
}

const deleteComment = async (req, res, next) => {
    try {
        const {id} = req.params;
        await Comment.findByIdAndDelete(id);
        return res.redirect("/admin/comments");
    } catch (error) {
        next(error);
    }
}

export {
    createComment,
    approveComment,
    rejectComment,
    deleteComment,
}