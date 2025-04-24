import { Router } from "express";
import { getMaps, getMapById } from "../controllers/map";

const router = Router();

router.get("/", getMaps);
router.get("/:mapId", getMapById);

export default router;
