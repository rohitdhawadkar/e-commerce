import { Product } from "@prisma/client";
import {
  CreateProduct,
  getAllProducts,
  getProductByID,
  updateProductByID,
  deleteProductByID,
} from "../Controller/ProductController";
import { Router } from "express";
const router: Router = Router();

router.post<{}, {}, Product>("/createProduct", (req, res, next) => {
  CreateProduct(req, res).catch(next);
});

router.get<{}, {}>("/getProducts", (req, res, next) => {
  getAllProducts(req, res).catch(next);
});
router.get<{ id: string }, {}>("/getProducts/:id", (req, res, next) => {
  getProductByID(req, res).catch(next);
});

router.put<{ id: string }, {}, Product>(
  "/updateProduct/:id",
  (req, res, next) => {
    updateProductByID(req, res).catch(next);
  },
);

router.delete<{ id: string }, {}>("/deleteProduct/:id", (req, res, next) => {
  deleteProductByID(req, res).catch(next);
});

export default router;
