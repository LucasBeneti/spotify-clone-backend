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

  fastify.get(
    "/:q/:search_filter",
    async (
      request: FastifyRequest<{ Params: { q: string; search_filter: string } }>,
      reply: FastifyReply
    ) => {
      // TODO implement the fuzzy search here

      const { q, search_filter } = request.params;
      let filteredData;
      switch (search_filter) {
        case "songs":
          filteredData = await SongController.fuzzyFind(q);
          break;
        case "albums":
          filteredData = await AlbumController.fuzzyFind(q);
          break;
        case "playlists":
          filteredData = await PlaylistController.fuzzyFind(q);
          break;
        case "artists":
          filteredData = await ArtistController.fuzzyFind(q);
          break;
        default:
          filteredData = null;
          break;
      }

      reply.status(200).send({ filteredData });
    }
  );
}
