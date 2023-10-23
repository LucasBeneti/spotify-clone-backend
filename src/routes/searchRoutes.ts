import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import database from "../database";
import SongController from "../controllers/SongController";

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

      const songsResult = await SongController.fuzzyFind(q);
      reply.status(200).send({ songsResult });
    }
  );
}
