import { Router } from "express";
import { getMaps } from "../controllers/map";

const router = Router();

router.get("/", getMaps);

export default router;
