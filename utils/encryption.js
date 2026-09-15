import { compareSync, genSaltSync, hashSync } from "bcrypt";
import jwt from "jsonwebtoken";
import {createError} from "./createError.js";

const encryptPassword = password => {
    const salt = genSaltSync(10);
    return hashSync(password, salt);
}

const verifyPassword = (password, encryptedPassword) => {
    return compareSync(password, encryptedPassword);
}

const createToken = payload => {
    return jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: "2h"
    });
}

const verifyToken = token => {
    try {
        return jwt.verify(token, process.env.SECRET_KEY);
    } catch (error) {
        console.log(error.message);
        throw createError("Invalid or expired token", 401);
    }
}

export {
    encryptPassword,
    verifyPassword,
    createToken,
    verifyToken,
}