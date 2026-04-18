-- Add creator ownership to projects
ALTER TABLE "projects" ADD COLUMN "creator_id" INTEGER;

-- Backfill existing seeded projects so the current local database can migrate cleanly
UPDATE "projects"
SET "creator_id" = (SELECT "id" FROM "users" WHERE "email" = 'user6@test.com' LIMIT 1)
WHERE "name" = 'Admin Sample Project';

UPDATE "projects"
SET "creator_id" = (SELECT "id" FROM "users" WHERE "email" = 'user5@test.com' LIMIT 1)
WHERE "name" = 'User Sample Project';

-- Make the ownership field required for all future data
ALTER TABLE "projects" ALTER COLUMN "creator_id" SET NOT NULL;

-- Add the foreign key and index
ALTER TABLE "projects"
ADD CONSTRAINT "projects_creator_id_fkey"
FOREIGN KEY ("creator_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

CREATE INDEX "projects_creator_id_idx" ON "projects"("creator_id");
