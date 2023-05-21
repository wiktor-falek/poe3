import express from "express";
import {
  register,
  login,
  verify,
  recoverPassword,
  changePassword,
} from "../controllers/user.js";

const router = express.Router();

router.post("/auth/register", register);
router.post("/auth/login", login);
router.get("/auth/verify/:token", verify);
router.post("/auth/password/recover", recoverPassword);
router.put("/auth/password/change", changePassword);

export default router;
