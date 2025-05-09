import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

function getAnswer(
  mapId: number,
  characterId: number,
  posX: number,
  posY: number,
) {
  return {
    mapId,
    characterId,
    posX,
    posY,
  };
}

async function main() {
  await prisma.map.createMany({
    data: [
      {
        id: 1,
        name: "The Unfriendly Giants",
        url: "/static/maps/giants.jpeg",
      },
      {
        id: 2,
        name: "The Underground Hunters",
        url: "/static/maps/underground.jpeg",
      },
      {
        id: 3,
        name: "Dinosaurs, Spacemen and Ghouls",
        url: "/static/maps/space.jpeg",
      },
    ],
  });

  await prisma.character.createMany({
    data: [
      {
        id: 1,
        name: "Waldo",
        url: "/static/characters/Waldo.webp",
      },
      {
        id: 2,
        name: "Wenda",
        url: "/static/characters/Wenda.webp",
      },
      {
        id: 3,
        name: "Whitebeard",
        url: "/static/characters/Whitebeard.webp",
      },
      {
        id: 4,
        name: "Odlaw",
        url: "/static/characters/Odlaw.webp",
      },
    ],
  });

  await prisma.answer.createMany({
    data: [
      getAnswer(1, 1, 18, 66), // Waldo
      getAnswer(1, 2, 69, 79), // Wenda
      getAnswer(1, 3, 96, 77), // Whitebeard
      getAnswer(1, 4, 58, 90), // Odlaw

      getAnswer(2, 1, 86, 40),
      getAnswer(2, 2, 70, 5),
      getAnswer(2, 3, 63, 35),
      getAnswer(2, 4, 16, 4),

      getAnswer(3, 1, 91, 55),
      getAnswer(3, 2, 83, 58),
      getAnswer(3, 3, 67, 72),
      getAnswer(3, 4, 5, 49),
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
