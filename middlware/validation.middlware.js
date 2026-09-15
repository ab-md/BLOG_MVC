import { categorySchema } from "../validation/category.validation.js";
import { postSchema } from "../validation/post.validation.js";
import { loginSchema, passwordSchema, registerSchema } from "../validation/user.validation.js";

const registerValidation = (req, res, next) => {
    try {
        const result = registerSchema.safeParse(req.body);
        if (!result.success) {
            const errors = {};
            result.error.issues.forEach(issue => {
                const field = issue.path[0];
                errors[field] = issue.message;
            });
            req.flash("errors", errors);
            req.flash("oldData", req.body);
            return res.redirect("/register");
        }
        req.body = result.data;
        next();
    } catch (error) {
        next(error);
    }
}

const loginValidation = (req, res, next) => {
    try {
        const result = loginSchema.safeParse(req.body);
        if (!result.success) {
            const errors = {};
            result.error.issues.forEach(issue => {
                const field = issue.path;
                errors[field] = issue.message;
            });
            req.flash("errors", errors);
            req.flash("oldData", req.body);
            return res.redirect("/login");
        }
        req.body = result.data;
        next();
    } catch (error) {
        next(error);
    }
}

const categoryValidation = (req, res, next) => {
    try {
        const result = categorySchema.safeParse(req.body);
        if (!result.success) {
            const errors = {};
            result.error.issues.forEach(issue => {
                const field = issue.path;
                errors[field] = issue.message;
            });
            req.flash("errors", errors);
            req.flash("oldData", req.body);
            return res.redirect("/admin/new-category");
        }
        req.body = result.data;
        next();
    } catch (error) {
        next(error);
    }
}

const updateCategoryValidation = (req, res, next) => {
    try {
        const result = categorySchema.safeParse(req.body);
        if (!result.success) {
            const errors = {};
            result.error.issues.forEach(issue => {
                const field = issue.path;
                errors[field] = issue.message;
            });
            req.flash("errors", errors);
            req.flash("oldData", req.body);
            return res.redirect(`/admin/categories/${req.params.slug}`);
            // return res.redirect("/admin/categories");
        }
        req.body = result.data;
        next();
    } catch (error) {
        next(error);
    }
}

const postValidation = (req, res, next) => {
    try {
        const result = postSchema.safeParse(req.body);
        if (!result.success) {
            const errors = {};
            result.error.issues.forEach(issue => {
                const field = issue.path;
                errors[field] = issue.message;
            });
            req.flash("errors", errors);
            req.flash("oldData", req.body);
            console.log(errors);
            console.log(req.body);
            return res.redirect("/admin/new-post");
        }
        req.body = result.data;
        next();
    } catch (error) {
        next(error);
    }
}

const updatePostValidation = (req, res, next) => {
    try {
        const result = postSchema.safeParse(req.body);
        if (!result.success) {
            const errors = {};
            result.error.issues.forEach(issue => {
                const field = issue.path;
                errors[field] = issue.message;
            });
            req.flash("errors", errors);
            req.flash("oldData", req.body);
            console.log(errors);
            console.log(req.body);
            return res.redirect(`/admin/posts/${req.params.slug}`);
        }
        req.body = result.data;
        next();
    } catch (error) {
        next(error);
    }
}

const passwordValidation = (req, res, next) => {
    try {
        const result = passwordSchema.safeParse(req.body);
        if (!result.success) {
            const errors = {};
            result.error.issues.forEach(issue => {
                const field = issue.path;
                errors[field] = issue.message;
            });
            req.flash("errors", errors);
            req.flash("oldData", req.body);
            console.log(errors);
            console.log(req.body);
            return res.redirect("/profile");
        }
        req.body = result.data;
        next();
    } catch (error) {
        next(error);
    }
}

const validation = (schema, path) => {

}

export {
    registerValidation,
    loginValidation,
    categoryValidation,
    updateCategoryValidation,
    postValidation,
    updatePostValidation,
    passwordValidation,
}