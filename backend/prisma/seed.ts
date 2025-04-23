import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

async function main() {
  // Create maps
  await prisma.map.createMany({
    data: [
      { id: 1, name: "Beach Day" },
      { id: 2, name: "Space Station" },
      { id: 3, name: "Medieval Festival" },
    ],
  });

  // Create users
  await prisma.user.createMany({
    data: [
      { id: 1, uuid: "abc-123", name: "Alice" },
      { id: 2, uuid: "def-456", name: "Bob" },
      { id: 3, uuid: "ghi-789", name: "Charlie" },
    ],
  });

  // Create answers
  await prisma.answer.createMany({
    data: [
      { id: 1, mapId: 1, character: "WALDO", posX: 150, posY: 300 },
      { id: 2, mapId: 1, character: "WENDA", posX: 420, posY: 220 },
      { id: 3, mapId: 1, character: "WOOF", posX: 600, posY: 100 },
      { id: 4, mapId: 2, character: "WALDO", posX: 320, posY: 150 },
      { id: 5, mapId: 2, character: "WHITEBEARD", posX: 510, posY: 280 },
      { id: 6, mapId: 3, character: "ODLAW", posX: 720, posY: 360 },
    ],
  });

  // Create games
  await prisma.game.createMany({
    data: [
      {
        id: 1,
        createdAt: new Date("2025-04-20T12:00:00Z"),
        charactersFound: ["WALDO", "WENDA"],
        userId: 1,
        mapId: 1,
        finished: false,
      },
      {
        id: 2,
        createdAt: new Date("2025-04-21T14:30:00Z"),
        charactersFound: ["WALDO", "WENDA", "WOOF"],
        userId: 2,
        mapId: 1,
        finished: true,
      },
      {
        id: 3,
        createdAt: new Date("2025-04-22T16:45:00Z"),
        charactersFound: ["WHITEBEARD"],
        userId: 3,
        mapId: 2,
        finished: false,
      },
    ],
  });

  // Create times
  await prisma.time.createMany({
    data: [
      { id: 1, time: 120, gameId: 1 },
      { id: 2, time: 200, gameId: 2 },
      { id: 3, time: 300, gameId: 3 },
    ],
  });
}

main()
  .then(() => {
    console.log("🌱 Seed complete");
  })
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
