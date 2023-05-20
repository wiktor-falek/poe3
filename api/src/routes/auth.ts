import express from "express";
import { register, login, verify, recover } from "../controllers/user.js";

const router = express.Router();

router.post("/auth/register", register);
router.post("/auth/login", login);
router.get("/auth/verify/:token", verify);
router.put("/auth/password", recover);

export default router;
