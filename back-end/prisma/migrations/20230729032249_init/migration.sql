-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "VideoShare" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "upvote" INTEGER NOT NULL DEFAULT 0,
    "downvote" INTEGER NOT NULL DEFAULT 0,
    "sharedTime" DATETIME NOT NULL,
    "sharedById" TEXT NOT NULL,
    CONSTRAINT "VideoShare_sharedById_fkey" FOREIGN KEY ("sharedById") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_upvote_user" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_upvote_user_A_fkey" FOREIGN KEY ("A") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_upvote_user_B_fkey" FOREIGN KEY ("B") REFERENCES "VideoShare" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_updown_user" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_updown_user_A_fkey" FOREIGN KEY ("A") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_updown_user_B_fkey" FOREIGN KEY ("B") REFERENCES "VideoShare" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_upvote_user_AB_unique" ON "_upvote_user"("A", "B");

-- CreateIndex
CREATE INDEX "_upvote_user_B_index" ON "_upvote_user"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_updown_user_AB_unique" ON "_updown_user"("A", "B");

-- CreateIndex
CREATE INDEX "_updown_user_B_index" ON "_updown_user"("B");
