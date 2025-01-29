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

export async function getAllProducts(
  req: Request<{}, {}>,
  res: Response,
): Promise<Response> {
  try {
    const AllProducts = await prisma.product.findMany();
    if (!AllProducts) {
      return res.status(404).json({ msg: "no products" });
    }

    return res.status(404).json({ Products: AllProducts });
  } catch (error) {
    console.error("Error creating product:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
// export async function getAllProducts(
//   req: Request<{}, {}, {}, { page?: number; limit?: number }>,
//   res: Response,
// ): Promise<Response> {
//   try {
//     const page = Number(req.query.page) || 1;
//     const limit = Number(req.query.limit) || 10;
//     const skip = (page - 1) * limit;

//     const [products, total] = await Promise.all([
//       prisma.product.findMany({
//         skip,
//         take: limit,
//       }),
//       prisma.product.count(),
//     ]);

//     if (!products || products.length === 0) {
//       return res.status(404).json({ message: "No products found" });
//     }

//     return res.status(200).json({
//       products,
//       pagination: {
//         total,
//         page,
//         pages: Math.ceil(total / limit),
//       },
//     });
//   } catch (error) {
//     console.error("Error fetching products:", error instanceof Error ? error.message : error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// }
export async function getProductByID(
  req: Request<{ id: string }, {}, Product>,
  res: Response,
): Promise<Response> {
  try {
    const { id } = req.params;

    // Convert string ID to number and validate
    const productId = parseInt(id);
    if (isNaN(productId)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({ product });
  } catch (error) {
    console.error(
      "Error fetching product:",
      error instanceof Error ? error.message : error,
    );
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateProductByID(
  req: Request<{ id: string }, {}, Product>,
  res: Response,
): Promise<Response> {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Validate ID
    const productId = parseInt(id);
    if (isNaN(productId)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update product
    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: {
        p_name: updateData.p_name || existingProduct.p_name,
        p_description:
          updateData.p_description || existingProduct.p_description,
        p_price: updateData.p_price || existingProduct.p_price,
        p_category: updateData.p_category || existingProduct.p_category,
      },
    });

    return res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error(
      "Error updating product:",
      error instanceof Error ? error.message : error,
    );
    return res.status(500).json({ message: "Internal server error" });
  }
}
// const updateProductSchema = z.object({
//   name: z.string().min(1).optional(),
//   description: z.string().optional(),
//   price: z.number().positive().optional(),
//   // Add other fields as needed
// });
export async function deleteProductByID(
  req: Request<{ id: string }, {}, Product>,
  res: Response,
): Promise<Response> {
  try {
    const { id } = req.params;

    // Validate ID
    const productId = parseInt(id);
    if (isNaN(productId)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Delete product
    await prisma.product.delete({
      where: { id: productId },
    });

    return res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error(
      "Error deleting product:",
      error instanceof Error ? error.message : error,
    );
    return res.status(500).json({ message: "Internal server error" });
  }
}
