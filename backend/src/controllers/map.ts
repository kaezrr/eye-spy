import { Request, Response } from "express";
import db from "../db";

export async function getMaps(req: Request, res: Response) {
  const maps = await db.map.findMany();
  res.json(maps);
}
