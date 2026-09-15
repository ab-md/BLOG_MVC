import User from "../model/user.model.js";
import { createError } from "../utils/createError.js";
import { verifyToken } from "../utils/encryption.js";

const authentication = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            req.flash("errors", [{
                notAuthorized: "Log in to your account first"
            }]);
            return res.redirect("/login");
        }
        try {
            const tokenData = verifyToken(token);
            req.user = {
                id: tokenData.id,
                role: tokenData.role,
                email: tokenData.email,
            }
            return next();
        } catch (jwtError) {
            res.clearCookie("token");
            req.flash("errors", [{
                notAuthorized: "Log in to your account first"
            }]);
            return res.redirect("/login")
        }
    } catch (error) {
        next(error);
    }
}

const checkSigned = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) return next();
        try {
            const tokenData = verifyToken(token);
            const user = await User.findOne({ email: tokenData.email });
            req.user = user;
            return next();
        } catch (error) {
            throw createError("Something went Wrong!", 500)
        }
    } catch (error) {
        throw createError("Something went wrong!", 500)
    }
}

const notSigned = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            req.flash("errors", [{
                notSigned: "Log in to your account first"
            }])
            return next();
        }
        next();
    } catch (error) {
        next(error);
    }
}

const redirectSigned = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) return next();
        try {
            const tokenData = verifyToken(token);
            if (tokenData.role === "user") return res.redirect("/");
            return res.redirect("/admin");
        } catch (error) {
            throw createError("Something went Wrong!", 500)
        }
    } catch (error) {
        next(error);
    }
}

const userForbid = (req, res, next) => {
    try {
        const { role } = req.user;
        if (role === "user") return res.redirect("/");
        next();
    } catch (error) {
        next(error);
    }
}

export {
    authentication,
    userForbid,
    checkSigned,
    redirectSigned,
    notSigned,
}