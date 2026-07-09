import Fastify from "fastify";

const fastify = Fastify();

fastify.get("/status", (request, reply) => {
  return reply.status(200).send({
    status: "OK",
    uptime: process.uptime(),
    timestamp: Date.now()
  });
})

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
