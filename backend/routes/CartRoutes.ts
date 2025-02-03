import { CartItem } from "@prisma/client";
import { addToCart } from "../Controller/CartController";
import { Router } from "express";
import { Decimal } from "decimal.js";
const router: Router = Router();

router.post<{}, {}, CartItem>("/addToCart", (req, res, next) => {
  addToCart(req, res).catch(next);
});

export default router;
