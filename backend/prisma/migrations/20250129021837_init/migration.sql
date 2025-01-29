/*
  Warnings:

  - A unique constraint covering the columns `[p_id]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Product_p_id_key" ON "Product"("p_id");
