import { Router } from "express";
import { approveComment, createComment, deleteComment, rejectComment } from "../controller/comment.controller.js";
import { authentication, userForbid } from "../middlware/auth.middlware.js";

const router = Router();

router.use(authentication);
router.post("/:postSlug", createComment);
router.post("/:id/approve", userForbid, approveComment);
router.post("/:id/reject", userForbid, rejectComment);
router.post("/:id/delete", userForbid, deleteComment);

export { router as commentRouter };