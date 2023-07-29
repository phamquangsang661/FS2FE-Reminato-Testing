/*
  Warnings:

  - You are about to drop the column `thumbnailUrl` on the `VideoShare` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `VideoShare` table. All the data in the column will be lost.
  - Added the required column `thumbnailUrls` to the `VideoShare` table without a default value. This is not possible if the table is not empty.
  - Added the required column `videoId` to the `VideoShare` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_VideoShare" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "videoId" TEXT NOT NULL,
    "thumbnailUrls" TEXT NOT NULL,
    "upvote" INTEGER NOT NULL DEFAULT 0,
    "downvote" INTEGER NOT NULL DEFAULT 0,
    "sharedTime" DATETIME NOT NULL,
    "sharedById" TEXT NOT NULL,
    CONSTRAINT "VideoShare_sharedById_fkey" FOREIGN KEY ("sharedById") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_VideoShare" ("description", "downvote", "id", "sharedById", "sharedTime", "title", "upvote") SELECT "description", "downvote", "id", "sharedById", "sharedTime", "title", "upvote" FROM "VideoShare";
DROP TABLE "VideoShare";
ALTER TABLE "new_VideoShare" RENAME TO "VideoShare";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
