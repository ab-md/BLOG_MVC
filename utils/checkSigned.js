import { createError } from "./createError.js"

const checkSigned = (req, res, next) => {
    try {
        
    } catch (error) {
        throw createError("Something went wrong!", 500)
    }
}