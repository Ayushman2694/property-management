import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB, connectRedis} from "./config/database";

import authRoutes from "./routes/authRoutes";
import propertyRoutes from "./routes/propertyRoutes";
import favouriteRoutes from "./routes/favouriteRoutes";
import recommendationRoutes from "./routes/recommendationRoutes";
import { auth } from "./middleware/authMiddleware";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
app.use(cors());
app.use(cookieParser())
app.use(express.json());

connectDB();
connectRedis();

app.use("/api/auth", authRoutes);
app.use("/api/properties", auth, propertyRoutes);
app.use("/api/favourites", auth, favouriteRoutes);
app.use("/api/recommendations", auth, recommendationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
