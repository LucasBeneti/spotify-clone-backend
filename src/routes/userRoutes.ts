import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import * as UserController from "../controllers/UserController";

export async function userRoutes(fastify: FastifyInstance) {
  // fastify.get(
  //   "/auth",
  //   async (
  //     request: FastifyRequest<{ Body: { username: string } }>,
  //     reply: FastifyReply
  //   ) => {
  //     try {
  //       const { username } = request.body;
  //       // const
  //     } catch (error) {}
  //   }
  // );

  fastify.get(
    "/:id",
    async (
      request: FastifyRequest<{ Params: { id: number } }>,
      reply: FastifyReply
    ) => {
      console.log("USER GET");

      const { id } = request.params;
      const userInfo = await UserController.getUserInfo({ user_id: id });

      reply.status(200).send({ userInfo });
    }
  );

  fastify.post(
    "/",
    async (
      request: FastifyRequest<{ Body: { username: string } }>,
      reply: FastifyReply
    ) => {
      const { username } = request.body;
      const response = await UserController.create({ username });
      reply.status(201).send({ response });
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
