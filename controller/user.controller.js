import User from "../model/user.model.js";
import { createError } from "../utils/createError.js";
import { createToken, encryptPassword, verifyPassword } from "../utils/encryption.js";

const register = async (req, res, next) => {
    try {
        const { email, password, username: bodyUsername } = req.body;
        const existing = await User.findOne({email});
        if(existing) {
            req.flash("errors", [{
                existing: "This email already exists"
            }]);
            return res.redirect("/register");
        }
        const createData = {
            email,
            password: encryptPassword(password),
            username: bodyUsername || email.split("@")[0]
        }
        await User.create(createData);
        return res.redirect("/login");
    } catch (error) {
        next(error);
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !verifyPassword(password, user.password)) {
            req.flash("errors", [{
                email: "Incorrect email or password"
            }]);
            req.flash("oldData", [{
                email: req.body.email
            }]);
            return res.redirect("/login");
        }
        const token = createToken({
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        });
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 1000 * 60 * 60 * 2
        });
        if (user.role !== "user") return res.redirect("/admin");
        return res.redirect("/profile");
    } catch (error) {
        next(error);
    }
}

const logout = async (req, res, next) => {
    try {
        const user = req.user;
        if (!user) return res.redirect("/");
        res.clearCookie("token");
        return res.redirect("/login");
        next();
    } catch (error) {
        next(error);
    }
}

const changeRole = async (req, res, next) => {
    try {
        const { role } = req.body;
        const { id } = req.params;
        const { role: userRole, id: userId } = req.user;
        if (userRole === "user") return res.redirect("/");
        if (userRole !== "admin") {
            req.flash("errors", [{
                "message": "You can not change the role of users"
            }])
            return res.redirect("/admin/users");
        }
        if (userId === id && role !== "admin") {
            req.flash("errors", [{
                "message": "You can not degrade your role"
            }])
            return res.redirect("/admin/users");
        }
        await User.findByIdAndUpdate(id, {
            $set: { role }
        });
        return res.redirect("/admin/users");
    } catch (error) {
        next(error);
    }
}

const updateUsername = async (req, res, next) => {
    try {
        const { id } = req.params;
        const {id: userId} = req.user;
        const { username } = req.body;
        if(userId !== id) {
            return res.redirect("/");
        }
        if (!username || username === undefined) {
            req.flash("errors", [{
                username: "Username can not be empty"
            }]);
            return res.redirect("/profile");
        }
        await User.findByIdAndUpdate(id, {
            $set: { username }
        })
        return res.redirect("/profile");
    } catch (error) {
        next(error);
    }
}

const updatePassword = async (req, res, next) => {
    try {
        const { id } = req.params;
        const {id: userId} = req.user;
        if(userId !== id) {
            return res.redirect("/");
        }
        const { currentPassword, confirmPassword, password } = req.body;
        const user = await User.findById(id);
        if (!verifyPassword(currentPassword, user.password)) {
            req.flash("errors", [{
                incorrectPassword: "You entred your previos password incorrect."
            }]);
            return res.redirect("/profile");
        }
        await User.findByIdAndUpdate(id, {
            $set: { password: encryptPassword(password) }
        });
        res.clearCookie("token");
        return res.redirect("/login");
    } catch (error) {
        next(error);
    }
}

export {
    register,
    login,
    logout,
    changeRole,
    updateUsername,
    updatePassword,
}