import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { getAuth } from "@clerk/fastify";

import * as UserController from "../controllers/UserController";

export async function userRoutes(fastify: FastifyInstance) {
  fastify.addHook("preHandler", async (request, reply) => {
    const { userId } = getAuth(request);
    if (!userId) {
      reply.status(401).send({ erroMessage: "Unauthorized." });
    }
  });

  fastify.get(
    "/:username",
    async (
      request: FastifyRequest<{ Params: { username: string } }>,
      reply: FastifyReply
    ) => {
      const { userId } = getAuth(request);
      reply.status(201).send({ userId });
    }
  );

  fastify.post(
    "/",
    async (request: FastifyRequest<{ Body: string }>, reply: FastifyReply) => {
      const { userId } = getAuth(request);
      const { username } = JSON.parse(request.body);
      const userToCreate = {
        username,
        clerkUserId: userId!,
      };
      const response = await UserController.create(userToCreate);
      return reply.status(201).send({ response });
    }
  );

  fastify.post(
    "/follow",
    async (
      request: FastifyRequest<{
        Querystring: { user_id: number; artist_id: number };
      }>,
      reply: FastifyReply
    ) => {
      try {
        const { artist_id, user_id } = request.query;

        await UserController.followArtist({
          user_id,
          artist_id,
        });

        reply.status(200);
      } catch (error) {
        console.error("Error while trying to follow artist.", error);
      }
    }
  );

  fastify.delete(
    "/unfollow",
    async (
      request: FastifyRequest<{
        Querystring: { user_id: number; artist_id: number };
      }>,
      reply: FastifyReply
    ) => {
      try {
        const { artist_id, user_id } = request.query;
        await UserController.unfollowArtist({ artist_id, user_id });

        reply.status(204);
      } catch (error) {
        console.error("Error while attempting to unfollow an artists", error);
      }
    }
  );
}
