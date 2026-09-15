import { Router } from "express";
import { userRouter } from "./user.route.js";
import { postRouter } from "./post.route.js";
import { commentRouter } from "./comment.route.js";
import { categoryRouter } from "./category.route.js";
import { publicViewRouter } from "./public.route.js";
import { adminViewRouter } from "./admin.route.js";

const router = Router();

router.use("/", publicViewRouter);
router.use("/admin", adminViewRouter);
router.use("/auth", userRouter);
router.use("/posts", postRouter);
router.use("/comments", commentRouter);
router.use("/categories", categoryRouter);

export { router as allRoutes };