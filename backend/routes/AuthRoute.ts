import { Login, Register } from "../Controller/AuthController";
import { Router, Request, Response } from "express";

const router: Router = Router();

router.post<{}, {}, { username: string; password: string }>(
  "/register",
  (req, res, next) => {
    Register(req, res).catch(next);
  },
);

router.post<{}, {}, { username: string; password: string }>(
  "/login",
  (req, res, next) => {
    Login(req, res).catch(next);
  },
);

export default router;
