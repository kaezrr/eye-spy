import { Request, Response } from "express";
import db from "../db";

export async function getMaps(req: Request, res: Response) {
  const maps = await db.map.findMany();
  res.json(maps);
}

export async function getMapById(req: Request, res: Response) {
  const { mapId } = req.params;
  const map = await db.map.findUnique({ where: { id: parseInt(mapId) } });
  res.json(map);
}
