"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthRoute_1 = __importDefault(require("../routes/AuthRoute"));
const ProductRoute_1 = __importDefault(require("../routes/ProductRoute"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api", AuthRoute_1.default);
app.use("/products", ProductRoute_1.default);
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
});
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
