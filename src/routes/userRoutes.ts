import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { getAuth } from "@clerk/fastify";

import UserController from "../controllers/UserController";

export async function userRoutes(fastify: FastifyInstance) {
  fastify.addHook("preHandler", async (request, reply) => {
    const { userId } = getAuth(request);
    if (!userId) {
      reply.status(401).send({ erroMessage: "Unauthorized." });
    }
  });

  fastify.get("/", async (request: FastifyRequest, reply: FastifyReply) => {
    const { userId } = getAuth(request);
    if (!userId) {
      return reply.status(403).send({ errorMessage: "Unauthorized access." });
    }
    const userData = await UserController.getUserInfo(userId);
    return reply.status(201).send({ data: userData });
  });

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
      // TODO check response to return the correct code and message
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

  fastify.post(
    "/song/like/:song_id",
    async (
      request: FastifyRequest<{
        Params: { song_id: number };
      }>,
      reply: FastifyReply
    ) => {
      try {
        const { song_id } = request.params;
        const { userId } = getAuth(request);
        await UserController.likeSong(song_id, userId!);

        reply.status(200);
      } catch (error) {
        console.error("Error while attempting to like a song.", error);
      }
    }
  );

  fastify.delete(
    "/song/dislike/:song_id",
    async (
      request: FastifyRequest<{
        Params: { song_id: number };
      }>,
      reply: FastifyReply
    ) => {
      try {
        const { song_id } = request.params;
        const { userId } = getAuth(request);
        await UserController.dislikeSong(song_id, userId!);

        reply.status(200);
      } catch (error) {
        console.error("Error while attempting to like a song.", error);
        reply.status(404);
      }
    }
  );
}
