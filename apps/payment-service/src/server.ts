import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { requireAuth } from "./middleware/authMiddleware.js";

const app = new Hono();

app.use("*", clerkMiddleware());

app.get("/status", (c) => {
  return c.json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: Date.now().toLocaleString(),
  });
});

app.get("/protected", requireAuth, (c) => {
  return c.json({
    message: "You are logged in!",
    userId:c.get("userId")
  });
});

const start = async () => {
  try {
    serve(
      {
        fetch: app.fetch,
        port: 5002,
      },
      (info) => {
        console.log(`Server is running on http://localhost:${info.port}`);
      },
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
