import { Product } from "@prisma/client";
import { CreateProduct } from "../Controller/ProductController";
import { Router } from "express";
const router: Router = Router();

router.post<{}, {}, Product>("/createProduct", (req, res, next) => {
  CreateProduct(req, res).catch(next); // Handle errors
});

export default router;
