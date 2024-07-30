-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Questionaire" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "questions" TEXT,
    "isDirty" BOOLEAN NOT NULL DEFAULT false,
    "answer" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Questionaire" ("answer", "id", "isDirty", "questions") SELECT "answer", "id", "isDirty", "questions" FROM "Questionaire";
DROP TABLE "Questionaire";
ALTER TABLE "new_Questionaire" RENAME TO "Questionaire";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
