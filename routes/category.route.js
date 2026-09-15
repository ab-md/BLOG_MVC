import { Router } from "express";
import { createCategory, deleteCategory, updateCategory } from "../controller/category.controller.js";
import { categoryValidation, updateCategoryValidation } from "../middlware/validation.middlware.js";
import { authentication, userForbid } from "../middlware/auth.middlware.js";

const router = Router();

router.use(authentication);
router.use(userForbid);
router.post("/", categoryValidation, createCategory);
router.post("/:slug", updateCategoryValidation, updateCategory);
router.post("/:slug/delete", deleteCategory);

export { router as categoryRouter };