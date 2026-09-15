import Comment from "../model/comment.model.js";
import Post from "../model/post.model.js";

const createPost = async (req, res, next) => {
    try {
        const { title, text, slug, status, category } = req.body;
        const initialData = {
            title, text, slug, status, category
        }
        initialData.author = req.user.id
        await Post.create(initialData);
        return res.redirect("/admin/posts");
    } catch (error) {
        next(error);
    }
}

const updatePost = async (req, res, next) => {
    try {
        const { slug: urlSlug } = req.params;
        const { title, text, slug, status, category } = req.body;
        const post = await Post.findOne({ slug: urlSlug })
            .populate("author", "username")
            .select("author");
        if (!post) {
            req.flash("errors", [{
                notFound: "Post not found"
            }]);
            return res.redirect("/admin/posts")
        }
        const updateData = {};
        if (title !== undefined) {
            updateData.title = title;
        }
        if (text !== undefined) {
            updateData.text = text;
        }
        if (slug !== undefined) {
            updateData.slug = slug;
        }
        if (status !== undefined) {
            updateData.status = status;
        }
        if (category !== undefined) {
            updateData.category = category;
        }
        if (req.user.role !== "admin" && req.user.id !== post.author.id) {
            req.flash("errors", [{
                notAllowed: "You are not allowed to edit this post"
            }]);
            return res.redirect("/admin/posts");
        }
        const result = await Post.findOneAndUpdate({ slug: urlSlug }, {
            $set: updateData
        }, {
            new: true
        });
        return res.redirect("/admin/posts");
    } catch (error) {
        next(error);
    }
}

const deletePost = async (req, res, next) => {
    try {
        const { slug } = req.params;
        const { id, role } = req.user;
        const post = await Post.findOne({ slug }).populate("author", "username");
        if (!post) {
            req.flash("errors", [{
                notFound: "Post not found"
            }]);
            return res.redirect("/admin/posts")
        }
        if (role !== "admin" && id !== post.author.id) {
            req.flash("errors", [{
                notAllowed: "You are not allowed to edit this post"
            }]);
            return res.redirect("/admin/posts");
        }
        await Comment.deleteMany({ post: post._id });
        await Post.findOneAndDelete({ slug });
        return res.redirect("/admin/posts");
    } catch (error) {
        next(error);
    }
}

export {
    createPost,
    updatePost,
    deletePost,
}