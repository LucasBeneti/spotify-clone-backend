import 'dotenv/config';
import Fastify, { FastifyReply, FastifyRequest } from 'fastify';

import database from './database';
import { searchRoutes } from './routes/searchRoutes';
import { playlistRoutes } from './routes/playlistRoutes';
import { userRoutes } from './routes/userRoutes';

const server = Fastify({
    logger: {
        transport: {
            target: 'pino-pretty',
        },
    },
});

const PORT = 3000;

server.register(searchRoutes, { prefix: '/search' });
server.register(playlistRoutes, { prefix: '/playlist' });
server.register(userRoutes, { prefix: '/user' });

server.listen({ port: PORT, host: '0.0.0.0' }, (err, address) => {
    database
        .raw('SELECT 1')
        .then(() => {
            console.log('PostgresSQL connected!');
        })
        .catch((e) => {
            console.log('PostgreSQL not connected...', e);
        });
    if (err) {
        console.error(err);
        process.exit(1);
    }

    console.log(`Server listening on port ${address}`);
});
