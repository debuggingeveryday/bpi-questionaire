-- CreateTable
CREATE TABLE "Questionaire" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "questions" TEXT,
    "isDirty" BOOLEAN NOT NULL DEFAULT false,
    "answer" BOOLEAN NOT NULL DEFAULT false
);
