import { serve } from "@hono/node-server";
import { Hono } from "hono";

const app = new Hono();

app.get("/status", (c) => {
  return c.json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: Date.now().toLocaleString()
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

start()