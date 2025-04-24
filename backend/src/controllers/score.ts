import { Request, Response } from "express";
import db from "../db";

export async function getLeaderBoard(req: Request, res: Response) {
  const { mapId } = req.params;
  const map = await db.map.findUnique({ where: { id: parseInt(mapId) } });
  const leaderBoard = await db.round.findMany({
    where: { mapId: parseInt(mapId), finished: true },
    select: { name: true, time: true },
    orderBy: { time: "asc" },
  });

  res.json({
    name: map?.name,
    scores: leaderBoard,
  });
}
