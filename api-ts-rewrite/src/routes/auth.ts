import express from "express";

import { register } from "../controllers/user";

const router = express.Router();

router.post("/auth/register", register);
// router.post("/auth/login", () => {});
// router.post("/auth/verify/:token", () => {});

export default router;
