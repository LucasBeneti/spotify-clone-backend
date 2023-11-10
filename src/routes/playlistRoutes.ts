import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { getAuth } from "@clerk/fastify";
import * as PlaylistController from "../controllers/PlaylistController";

function errorMessage(
  status: number,
  errorMessage: string,
  replyInstance: FastifyReply
) {
  return replyInstance.status(status).send({ errorMessage });
}

export async function playlistRoutes(fastify: FastifyInstance) {
  fastify.addHook("preHandler", async (request, reply) => {
    const { userId } = getAuth(request);
    if (!userId) {
      reply.status(401).send({ erroMessage: "Unauthorized." });
    }
  });

  fastify.get(
    "/:playlist_id",
    async (
      request: FastifyRequest<{ Params: { playlist_id: number } }>,
      reply: FastifyReply
    ) => {
      const { playlist_id } = request.params;
      const playlists = await PlaylistController.getPlaylistInfoById(
        playlist_id
      );

      return reply.status(200).send({ playlists });
    }
  );

  fastify.get(
    "/user/:user_id",
    async (
      request: FastifyRequest<{ Params: { user_id: number } }>,
      reply: FastifyReply
    ) => {
      const { user_id } = request.params;
      const userPlaylists = await PlaylistController.getPlaylistsByUserId(
        user_id
      );

      reply.status(200).send({ userPlaylists });
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

      reply.status(200).send({ songs: playlist_songs });
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
        const { id } = request.params;
        const { name } = request.body;
        const createdResponse = await PlaylistController.create({
          name,
          author_id: id,
        });

        if (!createdResponse) {
          return reply.status(400).send({
            errorMessage:
              "Something went wrong while trying to create a new playlist.",
          });
        }

        return reply.status(201).send({ createdResponse });
      } catch (error) {
        console.error("POST error while trying to create a playlist.", error);
        reply.status(500).send({ error });
      }
    }
  );

  fastify.post(
    "/like",
    async (
      request: FastifyRequest<{
        Body: { playlist_id: number; user_id: number };
      }>,
      reply: FastifyReply
    ) => {
      const { playlist_id, user_id } = request.body;

      try {
        await PlaylistController.likePlaylist(playlist_id, user_id);

        return reply
          .status(200)
          .send({ message: "Successfully liked the playlist." });
      } catch (error) {
        console.error(
          `Error while trying to like a playlsit with ID ${playlist_id}}`,
          error
        );
      }
    }
  );

  fastify.delete(
    "/dislike",
    async (
      request: FastifyRequest<{
        Body: { playlist_id: number; user_id: number };
      }>,
      reply: FastifyReply
    ) => {
      const { playlist_id, user_id } = request.body;
      try {
        await PlaylistController.dislikePlaylist(playlist_id, user_id);
        return reply.status(200).send({ message: "Successful dislike." });
      } catch (error) {
        console.error(
          `Error while trying to dislike a playlsit with ID ${playlist_id}`,
          error
        );
      }
    }
  );

  fastify.post(
    "/add/song/:playlist_id",
    async (
      request: FastifyRequest<{
        Params: { playlist_id: number };
        Body: { song_id: number };
      }>,
      reply: FastifyReply
    ) => {
      try {
        const { playlist_id } = request.params;
        const { song_id } = request.body;

        const addedSongToPlaylist = await PlaylistController.addSongToPlaylist({
          song_id,
          playlist_id,
        });

        if (!addedSongToPlaylist) {
          return errorMessage(400, "Something went wrong ", reply);
        }
        return reply.status(200).send({ addedSongToPlaylist });
      } catch (error) {
        console.error("Error while trying to add song to playlist.", error);
      }
    }
  );

  fastify.delete(
    "/song/:playlist_id",
    async (
      request: FastifyRequest<{
        Params: { playlist_id: number };
        Body: { song_id: number };
      }>,
      reply: FastifyReply
    ) => {
      try {
        const { playlist_id } = request.params;
        const { song_id } = request.body;

        const deletedSong = await PlaylistController.deleteSongFromPlaylist({
          song_id,
          playlist_id,
        });

        if (!deletedSong) {
          return errorMessage(
            400,
            `Something went wrong while trying to delete song_id ${song_id} from playlist with playlist_id ${playlist_id}`,
            reply
          );
        }
        return reply.status(200).send({ deletedSong });
      } catch (error) {
        console.error("Error while trying to add song to playlist.", error);
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
      const { id } = request.params;
      try {
        await PlaylistController.deletePlaylist({ playlist_id: id });
        reply.status(200);
      } catch (error) {
        console.error(
          `Error while trying to delete a playlist with ID ${id}`,
          error
        );
      }
    }
  );
}
