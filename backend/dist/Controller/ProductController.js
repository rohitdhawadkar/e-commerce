"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProduct = CreateProduct;
const prisma_1 = __importDefault(require("./prisma"));
function CreateProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { p_id, p_name, p_description, p_category, p_price } = req.body;
        try {
            const existingProduct = yield prisma_1.default.product.findUnique({
                where: { p_id: p_id },
            });
            if (existingProduct) {
                return res.status(409).json({ msg: "Product already exists" });
            }
            const newProduct = yield prisma_1.default.product.create({
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
        }
        catch (error) {
            console.error("Error creating product:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    });
}
