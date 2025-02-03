import { Request, Response } from "express";
import prisma from "./prisma";
import Decimal from "decimal.js";

interface CartItem {
  id?: string;
  cartId: string;
  p_id: number;
  quantity: number;
  price: Decimal;
}

async function createCart() {
  try {
    const newCart = await prisma.cart.create({
      data: {},
    });
    return newCart;
  } catch (error) {
    throw new Error("Failed to create cart");
  }
}
export async function addToCart(
  req: Request<{}, {}, CartItem>,
  res: Response,
): Promise<Response> {
  try {
    const { cartId, p_id, quantity, price } = req.body;

    let currentCartId = cartId;
    if (!currentCartId) {
      const newCart = await createCart();
      currentCartId = newCart.id;
    }

    if (!p_id || !quantity || !price) {
      return res.status(400).json({ msg: "Missing required fields" });
    }

    const existingItem = await prisma.cartItem.findFirst({
      where: {
        cartId: currentCartId,
        p_id,
      },
    });

    if (existingItem) {
      // Update quantity if item already exists
      const cartItem1 = await prisma.cartItem.update({
        where: {
          id: existingItem.id,
        },
        data: {
          quantity: existingItem.quantity + quantity,
        },
      });
      return res.status(200).json({
        success: true,
        data: cartItem1,
        msg: "Item added to cart successfully",
      });
    }

    //creating a new item
    const cartItem2 = await prisma.cartItem.create({
      data: {
        cartId: currentCartId,
        p_id,
        quantity: quantity,
        price,
      },
    });
    return res.status(200).json({
      success: true,
      data: cartItem2,
      msg: "Item added to cart successfully",
    });
  } catch (error) {
    console.error("Error creating product:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
