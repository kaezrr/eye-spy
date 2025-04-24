-- DropForeignKey
ALTER TABLE "RoundCharacters" DROP CONSTRAINT "RoundCharacters_roundId_fkey";

-- AddForeignKey
ALTER TABLE "RoundCharacters" ADD CONSTRAINT "RoundCharacters_roundId_fkey" FOREIGN KEY ("roundId") REFERENCES "Round"("id") ON DELETE CASCADE ON UPDATE CASCADE;
