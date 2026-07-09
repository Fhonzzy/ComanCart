import express, { Request, Response } from "express";
import cors from "cors";
import { corsOptions } from "../configs/corsConfig.js";
const app = express();
app.use(
  cors({
    origin: corsOptions,
    credentials: true,
  }),
);

app.get("/status", (req: Request, res: Response) => {
  return res.status(200).json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: Date.now()
  });
});

app.listen(5000, () => {
  console.log("Product Service");
});
