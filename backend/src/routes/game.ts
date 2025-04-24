import { Router } from "express";
import {
  checkCharacter,
  getPlayerRound,
  getRoundCharacters,
  startRound,
} from "../controllers/game";

const router = Router();

router.post("/start", startRound);
router.get("/round", getPlayerRound);
router.put("/check", checkCharacter);
router.get("/characters", getRoundCharacters);

export default router;
