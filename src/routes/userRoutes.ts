import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import * as UserController from '../controllers/UserController';

export async function userRoutes(fastify: FastifyInstance) {
    fastify.get(
        '/:id',
        async (
            request: FastifyRequest<{ Params: { id: number } }>,
            reply: FastifyReply
        ) => {
            console.log('USER GET');

            const { id } = request.params;
            const userInfo = await UserController.getUserInfo({ user_id: id });

            reply.status(200).send({ userInfo });
        }
    );

    fastify.post(
        '/',
        async (
            request: FastifyRequest<{ Body: { username: string } }>,
            reply: FastifyReply
        ) => {
            const { username } = request.body;
            const response = await UserController.create({ username });
            reply.status(201).send({ response });
        }
    );
}
