/*
  Warnings:

  - You are about to drop the `_ListToMovie` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[imdbId]` on the table `Movie` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `imdbId` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ListToMovie" DROP CONSTRAINT "_ListToMovie_A_fkey";

-- DropForeignKey
ALTER TABLE "_ListToMovie" DROP CONSTRAINT "_ListToMovie_B_fkey";

-- AlterTable
ALTER TABLE "Movie" ADD COLUMN     "imdbId" TEXT NOT NULL,
ALTER COLUMN "released" DROP NOT NULL,
ALTER COLUMN "genre" DROP NOT NULL,
ALTER COLUMN "runtime" DROP NOT NULL,
ALTER COLUMN "plot" DROP NOT NULL,
ALTER COLUMN "poster" DROP NOT NULL;

-- DropTable
DROP TABLE "_ListToMovie";

-- CreateTable
CREATE TABLE "ListMovie" (
    "listId" TEXT NOT NULL,
    "movieId" TEXT NOT NULL,
    "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ListMovie_pkey" PRIMARY KEY ("listId","movieId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Movie_imdbId_key" ON "Movie"("imdbId");

-- AddForeignKey
ALTER TABLE "ListMovie" ADD CONSTRAINT "ListMovie_listId_fkey" FOREIGN KEY ("listId") REFERENCES "List"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListMovie" ADD CONSTRAINT "ListMovie_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;
