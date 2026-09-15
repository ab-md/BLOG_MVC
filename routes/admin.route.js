import { Router } from "express";
import { getDashboard, getDashCategories, getDashCategoryDetail, getDashCategoryForm, getDashComments, getDashPostDetail, getDashPostForm, getDashPosts, getDashUserForm, getDashUsers } from "../controller/admin.controller.js";
import { authentication, userForbid } from "../middlware/auth.middlware.js";

const router = Router();
// middlewares
router.use(authentication);
router.use(userForbid);

// home
router.get("/", getDashboard);

// // posts
router.get("/posts", getDashPosts);
router.get("/posts/:slug", getDashPostDetail);

router.get("/new-post", getDashPostForm);

// // categories
router.get("/categories", getDashCategories);
router.get("/categories/:slug", getDashCategoryDetail);

router.get("/new-category", getDashCategoryForm);

// comments
router.get("/comments", getDashComments);

// // user
router.get("/users", getDashUsers);

router.get("/users/:id", getDashUserForm);

export { router as adminViewRouter };