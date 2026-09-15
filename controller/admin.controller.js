import Category from "../model/category.model.js";
import Comment from "../model/comment.model.js";
import Post from "../model/post.model.js";
import User from "../model/user.model.js"

const getDashboard = async (req, res, next) => {
    const posts = await Post.find({})
    .populate("author", "username")
    .select("title text image category author status slug");
    const user = req.user;
    const userData = await User.findOne({ email: user.email });
    res.render("admin/home", {
        layout: "layouts/admin",
        title: "Dashboard",
        user: userData,
        posts
    })
}

const getDashPosts = async (req, res, next) => {
    const posts = await Post.find({})
    .populate("author", "username")
    .populate("category", "title")
    .select("title text image category author status slug");
    const errors = req.flash("errors")[0] || {};
    res.render("admin/posts", {
        layout: "layouts/admin",
        title: "Posts",
        posts,
        errors
    })
}

const getDashPostForm = async (req, res, next) => {
    const categories = await Category.find({}).select("title slug");
    const errors = req.flash("errors")[0] || {};
    const oldData = req.flash("oldData")[0] || {};
    res.render("admin/postForm", {
        layout: "layouts/admin",
        title: "create post",
        categories,
        errors,
        oldData
    })
}

const getDashPostDetail = async (req, res, next) => {
    const {slug} = req.params;
    const categories = await Category.find({}).select("title slug");
    const post = await Post.findOne({slug})
    .populate("author", "username")
    .populate("category", "title")
    .select("title text slug status author category image");
    const errors = req.flash("errors")[0] || {};
    res.render("admin/postDetail", {
        layout: "layouts/admin",
        title: "create post",
        post,
        categories,
        errors
    });
}

const getDashCategories = async (req, res, next) => {
    const categories = await Category.find({}).select("title slug image");
    const errors = req.flash("errors")[0] || {};
    res.render("admin/categories", {
        layout: "layouts/admin",
        title: "Categories",
        categories,
        errors
    })
}

const getDashCategoryForm = (req, res, next) => {
    const errors = req.flash("errors")[0] || {};
    const oldData = req.flash("oldData")[0] || {};
    res.render("admin/categoryForm", {
        layout: "layouts/admin",
        title: "create category",
        errors,
        oldData
    })
}

const getDashCategoryDetail = async (req, res, next) => {
    const { slug } = req.params;
    const errors = req.flash("errors")[0] || {};
    const category = await Category.findOne({ slug });
    res.render("admin/categoryDetail", {
        layout: "layouts/admin",
        title: "create category",
        category,
        errors
    })
}

const getDashComments = async (req, res, next) => {
    const comments = await Comment.find({}).populate("user", "avatar username").populate("post", "title slug");
    res.render("admin/comments", {
        layout: "layouts/admin",
        title: "Comments",
        comments
    })
}

const getDashUsers = async (req, res, next) => {
    const errors = req.flash("errors")[0] || {};
    const users = await User.find({});
    res.render("admin/users", {
        layout: "layouts/admin",
        title: "Users",
        users,
        errors
    })
}

const getDashUserForm = async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findById(id);
    const roles = ["Admin", "User", "Author"];
    res.render("admin/userForm", {
        layout: "layouts/admin",
        title: "Users info",
        user,
        roles
    })
}

export {
    getDashboard,
    getDashCategories,
    getDashCategoryForm,
    getDashCategoryDetail,
    getDashComments,
    getDashPosts,
    getDashPostForm,
    getDashPostDetail,
    getDashUsers,
    getDashUserForm,
}