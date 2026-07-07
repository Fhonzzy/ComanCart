import Fastify from "fastify";

const fastify = Fastify();

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
