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
exports.Register = Register;
exports.Login = Login;
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = __importDefault(require("./prisma"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const saltRounds = 10;
function Register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ msg: "Username and password are required" });
        }
        try {
            const existingUser = yield prisma_1.default.user.findUnique({
                where: { username },
            });
            if (existingUser) {
                return res.status(409).json({ msg: "User already exists" });
            }
            const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
            const newUser = yield prisma_1.default.user.create({
                data: {
                    username,
                    password: hashedPassword,
                },
            });
            return res
                .status(201)
                .json({ msg: "User registered successfully", user: newUser });
        }
        catch (error) {
            console.error("Error during registration:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    });
}
function Login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { username, password } = req.body;
            if (!username || !password) {
                return res
                    .status(400)
                    .json({ msg: "Username and password are required" });
            }
            const user = yield prisma_1.default.user.findUnique({
                where: {
                    username: username,
                },
            });
            if (!user) {
                return res.status(401).json({ msg: "Invalid credentials" });
            }
            const isMatch = yield bcrypt_1.default.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ msg: "Invalid credentials" });
            }
            const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET || "your-secret-key", { expiresIn: "1h" });
            return res.status(200).json({
                msg: "Login successful",
                token,
                user: {
                    id: user.id,
                    username: user.username,
                },
            });
        }
        catch (error) {
            console.error("Login error:", error);
            return res.status(500).json({ msg: "Server error" });
        }
    });
}
