import { getAuth } from "@clerk/fastify";
import { FastifyRequest, FastifyReply } from "fastify";

declare module "fastify" {
  interface FastifyRequest {
    userId?: string;
  }
}

export const requireAuth = async (request:FastifyRequest, reply:FastifyReply):Promise<void>=>{
 const { userId } = getAuth(request)

    if (!userId) {
      return reply.code(401).send({ error: 'User not authenticated' })
    }

    request.userId = userId;
}