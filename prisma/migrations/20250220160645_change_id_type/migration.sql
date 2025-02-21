/*
  Warnings:

  - The primary key for the `Pattern` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Pattern` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `PinHash` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `PinHash` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `PinNumbers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `PinNumbers` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Pattern" DROP CONSTRAINT "Pattern_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Pattern_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "PinHash" DROP CONSTRAINT "PinHash_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "PinHash_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "PinNumbers" DROP CONSTRAINT "PinNumbers_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "PinNumbers_pkey" PRIMARY KEY ("id");
