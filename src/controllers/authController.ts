import { Request, Response } from "express";
import bcrypt from "bcrypt";
import userModel from "../models/user.model"; // adjust path as per your project
import jwt from "jsonwebtoken";
export const register = async (req: any, res: any) => {
  try {
    const { name, email, password } = req.body;

    // Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    // Remove password from response
    const userObj = user.toObject();
    delete userObj.password;

    return res.status(201).json(userObj);
  } catch (error) {
    console.error("Registration Error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const login = async (req: any, res: any) => {
  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    const user: any = await userModel.findOne({ email }); // if password is select: false in schema
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" } // Set expiry if needed
    );
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    return res.status(200).json({ token });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};
