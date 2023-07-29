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
    "sharedTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sharedById" TEXT NOT NULL,
    CONSTRAINT "VideoShare_sharedById_fkey" FOREIGN KEY ("sharedById") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_VideoShare" ("description", "downvote", "id", "sharedById", "sharedTime", "thumbnailUrls", "title", "upvote", "videoId") SELECT "description", "downvote", "id", "sharedById", "sharedTime", "thumbnailUrls", "title", "upvote", "videoId" FROM "VideoShare";
DROP TABLE "VideoShare";
ALTER TABLE "new_VideoShare" RENAME TO "VideoShare";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
