"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ProductController_1 = require("../Controller/ProductController");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post("/createProduct", (req, res, next) => {
    (0, ProductController_1.CreateProduct)(req, res).catch(next); // Handle errors
});
exports.default = router;
