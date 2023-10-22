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
            const song = await SongController.getSong(id);

            reply.status(200).send({ song });
        }
    );

    fastify.get(
        '/artist/:artist_id',
        async (
            request: FastifyRequest<{ Params: { artist_id: number } }>,
            reply: FastifyReply
        ) => {
            const { artist_id } = request.params;
            const artistSongs = await SongController.getSongsByArtistId(
                artist_id
            );

            reply.status(200).send({ artistSongs });
        }
    );

    fastify.post(
        '/add_songs',
        async (
            request: FastifyRequest<{ Body: NewSong[] }>,
            reply: FastifyReply
        ) => {
            const songsToAdd = request.body.map((song) => {
                return {
                    name: song.name,
                    author_id: song.author_id,
                    album_id: song.album_id,
                    source_link: song.source_link,
                    position_on_album: song.position_on_album,
                };
            });
            const song = await SongController.create(songsToAdd);

            reply.status(201).send({ song });
        }
    );
}
