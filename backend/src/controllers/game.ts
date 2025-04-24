import { Request, Response } from "express";
import db from "../db";
import { log } from "console";

export async function getRoundCharacters(req: Request, res: Response) {
  const playerId = req.query.playerId as string;
  const characters = await db.round.findFirst({
    where: { userId: playerId },
    select: { characters: { include: { character: true } } },
    orderBy: { createdAt: "desc" },
  });

  res.json(
    characters?.characters.map((e) => ({
      name: e.character.name,
      url: e.character.url,
    })),
  );
}

export async function startRound(req: Request, res: Response) {
  const { playerId, mapId, name } = req.body;
  await db.round.deleteMany({
    where: { userId: playerId, finished: false },
  });

  let mapAnswers = await db.map.findFirst({
    where: { id: mapId },
    select: { answers: { select: { character: true } } },
  });

  const round = await db.round.createManyAndReturn({
    data: {
      userId: playerId,
      mapId: parseInt(mapId),
      name: name,
    },
  });

  let data =
    mapAnswers?.answers.map((e) => ({
      characterId: e.character.id,
      roundId: round[0].id,
    })) ?? [];

  await db.roundCharacters.createMany({
    data: data,
    skipDuplicates: true,
  });

  res.json("ok");
}

type Position = {
  x: number;
  y: number;
};

function matchPoint(pos1: Position, pos2: Position): boolean {
  const epsilon = 2;
  const diffx = Math.abs(pos1.x - pos2.x);
  const diffy = Math.abs(pos1.y - pos2.y);

  return diffx <= epsilon && diffy <= epsilon;
}

export async function checkCharacter(req: Request, res: Response) {
  const { playerId, who, x, y } = req.body;

  const round = await db.round.findFirst({
    where: { userId: playerId, finished: false },
    include: {
      characters: {
        select: { character: { select: { name: true } } },
      },
      map: {
        select: { answers: { include: { character: true } } },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  if (!round) {
    res
      .status(404)
      .json({ result: false, message: "no active round for player" });
    return;
  }

  const charactersLeft = round.characters.map((e) => e.character.name);
  const charactersPosition = round.map.answers.map((e) => ({
    name: e.character.name,
    x: e.posX,
    y: e.posY,
  }));

  const char = charactersPosition.find((e) => e.name === who);
  if (!charactersLeft.includes(who) || !char) {
    res.status(404).json({ result: false, message: "character doesn't exist" });
    return;
  }

  const result = matchPoint({ x, y }, { x: char.x, y: char.y });
  if (!result) {
    res.status(404).json({ result: false, message: "position doesn't match" });
    return;
  }

  await db.roundCharacters.deleteMany({
    where: { roundId: round.id, character: { name: who } },
  });

  const characters = await db.round.findFirst({
    where: { userId: playerId },
    select: { characters: { include: { character: true } } },
    orderBy: { createdAt: "desc" },
  });

  if (characters?.characters.length === 0) {
    const now = new Date();
    const then = new Date(round.createdAt);

    await db.round.update({
      where: { id: round.id },
      data: {
        finished: true,
        time: now.getTime() - then.getTime(),
      },
    });
  }

  res.json({ result, message: "you got it!" });
}

export async function getPlayerRound(req: Request, res: Response) {
  const playerId = req.query.playerId as string;
  const round = await db.round.findFirst({
    where: { userId: playerId },
    orderBy: { createdAt: "desc" },
    include: { map: { select: { id: true, name: true } } },
  });

  res.json({
    mapId: round?.map.id,
    map: round?.map.name,
    time: round?.time,
    finished: round?.finished,
  });
}
