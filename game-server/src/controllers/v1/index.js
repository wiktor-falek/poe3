import { Router } from "express";

import { default as characters } from "./characters.js";

const router = Router();

router.use("/v1", characters);

export default router;
