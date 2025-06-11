import jwt from "jsonwebtoken";

export const auth = (req: any, res: any, next: any) => {
 const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "No token" });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET!);
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
