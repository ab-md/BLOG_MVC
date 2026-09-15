import { Router } from "express";
import { getCategoriesPage, getCategoryDetailPage, getHomePage, getLoginPage, getLogoutPage, getPostDetailPage, getProfilePage, getRegisterPage } from "../controller/public.controller.js";
import { authentication, checkSigned, redirectSigned } from "../middlware/auth.middlware.js";

const router = Router();
// middlware
router.use(checkSigned);
// home
router.get("/", getHomePage);

// posts
// router.get("/posts", getPosts);
router.get("/posts/:slug", getPostDetailPage);

// // categories
router.get("/categories", getCategoriesPage);
router.get("/categories/:slug", getCategoryDetailPage);

// // user
router.get("/profile", authentication, getProfilePage);

router.get("/login", redirectSigned, getLoginPage);
router.get("/register", redirectSigned, getRegisterPage);
// router.get("/logout", getLogoutPage);

export { router as publicViewRouter };