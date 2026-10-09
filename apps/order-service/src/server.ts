import Fastify from "fastify";
import { clerkClient, clerkPlugin, getAuth } from "@clerk/fastify";
import { requireAuth } from "./middleware/authMiddleware.js";

const fastify = Fastify({ logger: true });

fastify.register(clerkPlugin);

fastify.get("/status", (request, reply) => {
  return reply.status(200).send({
    status: "OK",
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

fastify.get("/protected", {preHandler: requireAuth}, async (request, reply) => {
  try {
    return reply.send({
      message: "User retrieved successfully",
    });
  } catch (error) {
    fastify.log.error(error);
    return reply.code(500).send({ error: "Failed to retrieve user" });
  }
});

const start = async () => {
  try {
    await fastify.listen({ port: 5001 });
    console.log("Order Service");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
