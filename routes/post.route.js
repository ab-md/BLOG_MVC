import { Router } from "express";
import { createPost, deletePost, updatePost } from "../controller/post.controller.js";
import { postValidation, updatePostValidation } from "../middlware/validation.middlware.js";
import { authentication, userForbid } from "../middlware/auth.middlware.js";

const router = Router();

router.use(authentication);
router.use(userForbid);
router.post("/", postValidation, createPost);
router.post("/:slug", updatePostValidation, updatePost);
router.post("/:slug/delete", deletePost);

export { router as postRouter };