import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import * as PlaylistController from "../controllers/PlaylistController";

export async function playlistRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/:id",
    async (
      request: FastifyRequest<{ Params: { id: number } }>,
      reply: FastifyReply
    ) => {
      console.log("PLAYLIST GET");

      const { id } = request.params;
      const playlists = await PlaylistController.listByUserId({
        user_id: id,
      });

      reply.status(200).send({ playlists });
    }
  );

  fastify.get(
    "/songs/:id",
    async (
      request: FastifyRequest<{ Params: { id: number } }>,
      reply: FastifyReply
    ) => {
      const { id } = request.params;
      const playlist_songs = await PlaylistController.getPlaylistSongs(id);

      reply.status(200).send({ playlist_songs });
    }
  );

  fastify.post(
    "/:id",
    async (
      request: FastifyRequest<{
        Params: { id: number };
        Body: { name: string };
      }>,
      reply: FastifyReply
    ) => {
      try {
        console.log("PLAYLIST POST (create)");

        const { id } = request.params;
        const { name } = request.body;
        await PlaylistController.create({
          name,
          author_id: id,
        });

        reply.status(201).send({ name });
      } catch (error) {
        console.error("POST error while trying to create a playlist.", error);
        reply.status(500).send({ error });
      }
    }
  );

  fastify.delete(
    "/:id",
    async (
      request: FastifyRequest<{
        Params: { id: number };
        Body: { name: string };
      }>,
      reply: FastifyReply
    ) => {
      try {
        const { id } = request.params;
        await PlaylistController.deletePlaylist({ playlist_id: id });
        reply.status(200);
      } catch (error) {
        console.error("Error while trying to delete a playlist", error);
      }
    }
  );
}
