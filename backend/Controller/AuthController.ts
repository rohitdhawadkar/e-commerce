import { Request, Response } from "express";
import bcrypt from "bcrypt";
import prisma from "./prisma";
import jwt from "jsonwebtoken";

interface RegisterRequest {
  username: string;
  password: string;
}

const saltRounds = 10;

export async function Register(
  req: Request<{}, {}, RegisterRequest>,
  res: Response,
): Promise<Response> {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ msg: "Username and password are required" });
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      return res.status(409).json({ msg: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    return res
      .status(201)
      .json({ msg: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function Login(
  req: Request<{}, {}, RegisterRequest>,
  res: Response,
): Promise<Response> {
  try {
    const { username, password } = req.body;

    
    if (!username || !password) {
      return res
        .status(400)
        .json({ msg: "Username and password are required" });
    }

 
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    
    if (!user) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }


    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "1h" },
    );

   
    return res.status(200).json({
      msg: "Login successful",
      token,
      user: {
        id: user.id,
        username: user.username,
       
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ msg: "Server error" });
  }
}
