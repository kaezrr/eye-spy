import { Router } from "express";

import { getLeaderBoard } from "../controllers/score";

const router = Router();

router.get("/:mapId", getLeaderBoard);

export default router;
