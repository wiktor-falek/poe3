import express from "express";
import {
  createCharacter,
  deleteCharacter,
  getAllCharactersOverview,
  getCharacter,
} from "../controllers/character.js";

const router = express.Router();

router.get("/api/characters", getAllCharactersOverview);
router.get("/api/characters/:name", getCharacter);
router.post("/api/characters", createCharacter);
router.delete("/api/characters/:name", deleteCharacter);

export default router;
