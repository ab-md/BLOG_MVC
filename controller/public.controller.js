import Category from "../model/category.model.js";
import Comment from "../model/comment.model.js";
import Post from "../model/post.model.js";
import User from "../model/user.model.js"

const getHomePage = async (req, res, next) => {
    const user = req.user;
    const posts = await Post.find({})
        .populate("author", "username avatar")
        .populate("category", "title")
        .select("title text slug image author category image status");
    const published = posts.filter(post => post.status === "published");
    const categories = await Category.find({}).select("title slug");
    res.render("public/home", {
        layout: "layouts/public",
        title: "Home",
        user,
        posts: published,
        categories
    })
}

const getCategoriesPage = async (req, res, next) => {
    const user = req.user;
    const categories = await Category.find({}).select("title image slug");
    res.render("public/categories", {
        layout: "layouts/public",
        title: "categories",
        user,
        categories
    })
}

const getCategoryDetailPage = async (req, res, next) => {
    const user = req.user;
    const { slug } = req.params;
    const category = await Category.findOne({ slug }).select("title image slug");
    if(category === null) {
        return res.redirect("/404");
    }
    const posts = await Post.find({ category: category._id })
        .populate("author", "username avatar")
        .select("title text slug image author category image status");
    const published = posts.filter(post => post.status === "published");
    res.render("public/categoryDetail", {
        layout: "layouts/public",
        title: "category",
        user,
        category,
        posts: published
    })
}

const getPostDetailPage = async (req, res, next) => {
    const user = req.user;
    const { slug } = req.params;
    const post = await Post.findOne({ slug })
        .populate("author", "username avatar")
        .populate("category", "title slug")
        .select("title text image author category slug");
    if(post === null) {
        return res.redirect("/404");
    }
    const comments = await Comment.find({ post: post._id })
        .populate("user", "username avatar")
        .select("text user status post");
    const approvedComments = comments.filter(comment => comment.status === "approved");
    const errors = req.flash("errors")[0] || {};
    const messages = req.flash("messages")[0] || {};
    res.render("public/postDetail", {
        layout: "layouts/public",
        title: "Post",
        user,
        post,
        comments: approvedComments,
        errors,
        messages
    })
}

const getProfilePage = async (req, res, next) => {
    const { email } = req.user;
    const user = await User.findOne({ email }).select("username email avatar role");
    const errors = req.flash("errors") [0] || {};
    res.render("public/profile", {
        layout: "layouts/public",
        title: "profile",
        user,
        errors
    })
}

const getLoginPage = (req, res, next) => {
    const errors = req.flash("errors")[0] || {};
    const oldData = req.flash("oldData")[0] || {};
    const user = req.user;
    res.render("public/login", {
        layout: "layouts/public",
        title: "Login",
        errors,
        oldData,
        user
    })
}

const getLogoutPage = (req, res, next) => {
    const user = req.user;
    res.render("public/logout", {
        layout: false,
        title: "logout",
        user
    })
}

const getRegisterPage = (req, res, next) => {
    const errors = req.flash("errors")[0] || {};
    const oldData = req.flash("oldData")[0] || {};
    const user = req.user
    res.render("public/register", {
        layout: "layouts/public",
        title: "register",
        errors,
        oldData,
        user
    })
}

export {
    getCategoriesPage,
    getCategoryDetailPage,
    getHomePage,
    getLoginPage,
    getPostDetailPage,
    getProfilePage,
    getRegisterPage,
    getLogoutPage,
}