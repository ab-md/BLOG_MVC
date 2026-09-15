import Category from "../model/category.model.js";
import Post from "../model/post.model.js";

const createCategory = async (req, res, next) => {
    try {
        const { title, slug } = req.body;
        await Category.create({
            title,
            slug
        })
        return res.redirect("/admin/categories");
    } catch (error) {
        next(error);
    }
}

const updateCategory = async (req, res, next) => {
    try {
        const { slug: urlSlug } = req.params;
        const { title, slug } = req.body;
        const result = await Category.findOneAndUpdate({ slug: urlSlug }, {
            $set: { title, slug }
        }, {
            new: true
        });
        if (!result) {
            req.flash("error", [{
                notFound: "Category not found"
            }]);
            return res.redirect("/admin/categories");
        }
        return res.redirect("/admin/categories");
    } catch (error) {
        next(error);
    }
}

const deleteCategory = async (req, res, next) => {
    try {
        const { slug } = req.params;
        const category = await Category.findOne({ slug });
        if (!category) {
            req.flash("errors", [{
                notFound: "Category not found"
            }]);
            return res.redirect("/admin/posts")
        }
        await Post.deleteMany({ category: category._id });
        await Category.findOneAndDelete({ slug });
        return res.redirect("/admin/categories");
    } catch (error) {
        next(error);
    }
}

export {
    createCategory,
    updateCategory,
    deleteCategory,
}