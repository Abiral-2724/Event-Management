import express from "express";
import { guestLogin, login, logout, register } from "../controllers/user.controller.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

router.route("/register").post(singleUpload ,register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/guestlogin").post(guestLogin) ;
//router.route("/profile/update").post(isAuthenticated,singleUpload,updateProfile);

export default router;
