import express from "express";
import { register, login, verify } from "../controllers/user.js";

const router = express.Router();

router.post("/auth/register", register);
router.post("/auth/login", login);
router.get("/auth/verify/:token", verify);

export default router;
