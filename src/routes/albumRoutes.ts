import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import * as AlbumController from '../controllers/AlbumController';

export async function albumRoutes(fastify: FastifyInstance) {
    fastify.get(
        '/:id',
        async (
            request: FastifyRequest<{ Params: { id: number } }>,
            reply: FastifyReply
        ) => {
            const { id } = request.params;
            const album = await AlbumController.getAlbum(id);
            reply.status(200).send({ album });
        }
    );

    fastify.post(
        '/add_album',
        async (
            request: FastifyRequest<{
                Body: {
                    name: string;
                    author_id: number;
                    launch_year: number;
                }[];
            }>,
            reply: FastifyReply
        ) => {
            const albums = await AlbumController.create(request.body);
            reply.status(201).send({ albums });
        }
    );
}
