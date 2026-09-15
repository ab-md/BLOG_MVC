import { Router } from "express";
import { changeRole, login, logout, register, updatePassword, updateUsername } from "../controller/user.controller.js";
import { loginValidation, passwordValidation, registerValidation } from "../middlware/validation.middlware.js"
import { authentication, checkSigned, userForbid } from "../middlware/auth.middlware.js";

const router = Router();

router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);
router.post("/change-role/:id", authentication, userForbid, changeRole);
router.post("/logout", checkSigned, logout);
router.post("/:id/username", authentication, updateUsername);
router.post("/:id/password", authentication, passwordValidation, updatePassword);
// router.put("/:slug", updateUser);
// router.delete("/:slug", deleteUser);

export { router as userRouter };