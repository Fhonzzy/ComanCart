import express, { Request, Response } from "express";
import cors from "cors";
import { corsOptions } from "../configs/corsConfig.js";
import { clerkMiddleware, getAuth } from "@clerk/express";
import { requireAuth } from "./middleware/authMiddleware.js";
import productRouter from "./routes/product.route.js";
import categoryRouter from "./routes/category.route.js";
const app = express();

app.use(
  cors({
    origin: corsOptions,
    credentials: true,
  }),
);

app.use(clerkMiddleware());

app.get("/protected", requireAuth, async (req, res) => {
  res.json({ msg: "Product Service Authenticated", userId: req.userId });
});

app.get("/status", (req: Request, res: Response) => {
  return res.status(200).json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

app.use("/products", productRouter);
app.use("/categories", categoryRouter);

app.listen(5000, () => {
  console.log("Product Service is Live!!!");
});
