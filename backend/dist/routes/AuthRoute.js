"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AuthController_1 = require("../Controller/AuthController");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post("/register", (req, res, next) => {
    (0, AuthController_1.Register)(req, res).catch(next); // Handle errors
});
router.post("/login", (req, res, next) => {
    (0, AuthController_1.Login)(req, res).catch(next); // Handle errors
});
exports.default = router;
