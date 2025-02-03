import express, { Request, Response, NextFunction } from "express";
import Auth from "../routes/AuthRoute";
import ProductRoute from "../routes/ProductRoute";
import cartRoute from "../routes/CartRoutes";
import * as dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());

app.use("/api", Auth);
app.use("/products", ProductRoute);
app.use("/cart", cartRoute);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
