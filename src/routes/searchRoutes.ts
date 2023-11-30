import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import database from "../database";
import SongController from "../controllers/SongController";
import AlbumController from "../controllers/AlbumController";
import PlaylistController from "../controllers/PlaylistController";
import ArtistController from "../controllers/ArtistController";

function searchService(term = "") {
  console.log(`Searching for ${term}...`);
  return `result: ${term} does not exist!`;
}

export async function searchRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/:q",
    async (
      request: FastifyRequest<{ Params: { q: string } }>,
      reply: FastifyReply
    ) => {
      // TODO implement the fuzzy search here

      const { q } = request.params;

      const songs = await SongController.fuzzyFind(q);
      const albums = await AlbumController.fuzzyFind(q);
      const playlists = await PlaylistController.fuzzyFind(q);
      const artists = await ArtistController.fuzzyFind(q);

      reply.status(200).send({ songs, albums, playlists, artists });
    }
  );
}
