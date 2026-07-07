import express from "express";
import cors from "cors";
const app = express();
app.use(
  cors({
    origin: ["http://localhost:3002", "http://localhost:3001"],
    credentials: true,
  }),
);

app.listen(5000, () => {
  console.log("Product Service");
});
