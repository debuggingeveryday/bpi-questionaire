-- CreateTable
CREATE TABLE "Questionaire" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "questions" TEXT NOT NULL,
    "isDirty" BOOLEAN NOT NULL DEFAULT false,
    "answer" BOOLEAN NOT NULL DEFAULT false
);
