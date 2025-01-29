import { Request, Response } from "express";
import prisma from "./prisma";

interface Product {
  p_id: number;
  p_name: string;
  p_description: string;
  p_category: string;
  p_price: number;
}

export async function CreateProduct(
  req: Request<{}, {}, Product>,
  res: Response,
): Promise<Response> {
  const { p_id, p_name, p_description, p_category, p_price } = req.body;

  try {
    const existingProduct = await prisma.product.findUnique({
      where: { p_id: p_id },
    });

    if (existingProduct) {
      return res.status(409).json({ msg: "Product already exists" });
    }

    const newProduct = await prisma.product.create({
      data: {
        p_id,
        p_name,
        p_description,
        p_category,
        p_price,
      },
    });

    return res
      .status(201)
      .json({ msg: "Product created successfully", product: newProduct });
  } catch (error) {
    console.error("Error creating product:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
