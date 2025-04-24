-- CreateTable
CREATE TABLE "RoundCharacters" (
    "id" SERIAL NOT NULL,
    "roundId" INTEGER NOT NULL,
    "characterId" INTEGER NOT NULL,

    CONSTRAINT "RoundCharacters_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RoundCharacters" ADD CONSTRAINT "RoundCharacters_roundId_fkey" FOREIGN KEY ("roundId") REFERENCES "Round"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoundCharacters" ADD CONSTRAINT "RoundCharacters_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
