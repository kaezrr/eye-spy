import { Request, Response } from "express";
import db from "../db";

export async function getLeaderBoard(req: Request, res: Response) {
  const { mapId } = req.params;
  const leaderBoard = await db.time.findMany({
    where: { game: { mapId: parseInt(mapId) } },
    include: {
      game: {
        select: {
          user: { select: { name: true } },
        },
      },
    },
    orderBy: { time: "asc" },
  });

  const data = leaderBoard.map((e) => ({
    name: e.game.user.name,
    time: e.time,
  }));

  res.json(data);
}
