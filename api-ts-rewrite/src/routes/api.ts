import express from "express";
import {
  createCharacter,
  getAllCharactersOverview,
  getCharacter,
} from "../controllers/character.js";

const router = express.Router();

router.get("/api/characters", getAllCharactersOverview);
router.get("/api/characters/:name", getCharacter);
router.post("/api/characters", createCharacter);

export default router;
