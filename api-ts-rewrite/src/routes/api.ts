import express from "express";

const router = express.Router();

// router.get("/api/characters", () => {});

router.get("/api/test", (req, res) => {
  res.status(200).json({ test: "test" });
});

export default router;
