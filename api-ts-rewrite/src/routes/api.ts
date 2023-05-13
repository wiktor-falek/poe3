import express from "express";
import { createCharacter } from "../controllers/character.js";

const router = express.Router();

router.post("/api/characters", createCharacter);

export default router;
