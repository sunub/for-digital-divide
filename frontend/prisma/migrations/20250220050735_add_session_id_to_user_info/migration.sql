/*
  Warnings:

  - A unique constraint covering the columns `[session_id]` on the table `UserInfo` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "UserInfo" ADD COLUMN     "session_id" TEXT,
ADD CONSTRAINT "UserInfo_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserInfo_session_id_key" ON "UserInfo"("session_id");
