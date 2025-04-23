import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

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
