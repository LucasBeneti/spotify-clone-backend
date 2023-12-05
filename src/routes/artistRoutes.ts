import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { getAuth } from "@clerk/fastify";
import ArtistController from "../controllers/ArtistController";
import AlbumController from "../controllers/AlbumController";
import SongController from "../controllers/SongController";

export async function artistRoutes(fastify: FastifyInstance) {
  fastify.addHook("preHandler", async (request, reply) => {
    const { userId } = getAuth(request);
    if (!userId) {
      reply.status(401).send({ erroMessage: "Unauthorized." });
    }
  });

  fastify.get(
    "/:artist_id",
    async (
      request: FastifyRequest<{ Params: { artist_id: number } }>,
      reply: FastifyReply
    ) => {
      const { artist_id } = request.params;
      const artistInfo = await ArtistController.getArtistInfoById(artist_id);
      const mostPlayedSongs = await SongController.getSongsByArtistId(
        artist_id
      );
      const artistAlbums = await AlbumController.getAlbumsByArtistId(artist_id);

      return reply.status(200).send({
        artistInfo,
        albums: artistAlbums,
        mostPlayedSongs: mostPlayedSongs?.sort(
          (a, b) => b.times_played - a.times_played // sorted in descending order
        ),
      });
    }
  );
}
