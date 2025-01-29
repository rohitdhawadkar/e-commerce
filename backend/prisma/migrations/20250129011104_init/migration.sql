-- CreateTable
CREATE TABLE "Product" (
    "p_id" SERIAL NOT NULL,
    "p_name" TEXT NOT NULL,
    "p_description" TEXT NOT NULL,
    "p_category" TEXT NOT NULL,
    "p_price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("p_id")
);
