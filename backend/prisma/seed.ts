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
        name: "Woof",
        url: "/static/characters/Woof.webp",
      },
      {
        id: 3,
        name: "Wenda",
        url: "/static/characters/Wenda.webp",
      },
      {
        id: 4,
        name: "Whitebeard",
        url: "/static/characters/Whitebeard.webp",
      },
      {
        id: 5,
        name: "Odlaw",
        url: "/static/characters/Odlaw.webp",
      },
    ],
  });

  await prisma.answer.createMany({
    data: [
      getAnswer(1, 1, 0, 0),
      getAnswer(1, 2, 0, 0),
      getAnswer(1, 3, 0, 0),
      getAnswer(1, 4, 0, 0),
      getAnswer(1, 5, 0, 0),

      getAnswer(2, 1, 0, 0),
      getAnswer(2, 2, 0, 0),
      getAnswer(2, 3, 0, 0),
      getAnswer(2, 4, 0, 0),
      getAnswer(2, 5, 0, 0),

      getAnswer(3, 1, 0, 0),
      getAnswer(3, 2, 0, 0),
      getAnswer(3, 3, 0, 0),
      getAnswer(3, 4, 0, 0),
      getAnswer(3, 5, 0, 0),
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
