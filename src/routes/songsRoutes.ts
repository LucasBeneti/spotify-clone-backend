import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import * as SongController from '../controllers/SongController';
import type { NewSong } from '../contracts/types';

export async function songRoutes(fastify: FastifyInstance) {
    fastify.get(
        '/:id',
        async (
            request: FastifyRequest<{ Params: { id: number } }>,
            reply: FastifyReply
        ) => {
            const { id } = request.params;
            const song = SongController.getSong(id);

            reply.status(200).send({ song });
        }
    );

    fastify.post(
        '/add_song',
        async (
            request: FastifyRequest<{ Body: NewSong }>,
            reply: FastifyReply
        ) => {
            const {
                name,
                author_id,
                album_id,
                source_link,
                position_on_album,
            } = request.body;
            const song = SongController.create([
                {
                    name,
                    album_id,
                    author_id,
                    source_link,
                    position_on_album,
                },
            ]);

            reply.status(201).send({ song });
        }
    );
}
