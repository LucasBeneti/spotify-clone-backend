import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { Pool } from 'pg';

const pool = new Pool({
    user: 'postgres',
    password: 'postgres',
    host: 'localhost',
    database: 'postgres',
    port: 5432,
});

function searchService(term = '') {
    console.log(`Searching for ${term}...`);
    return `result: ${term} does not exist!`;
}

export async function searchRoutes(fastify: FastifyInstance) {
    fastify.get(
        '/:q',
        function (
            request: FastifyRequest<{ Params: { q: string } }>,
            reply: FastifyReply
        ) {
            console.log('entrou aqui pelo menos', typeof request.params.q);
            console.log('mais algo');

            const { q } = request.params;
            let result;
            pool.query(`SELECT * FROM artists LIMIT 10`, (err, results) => {
                if (err) {
                    throw err;
                }
                result = results.rows;
                reply.status(200).send({ result }); // TODO descobrir por que não consigo fazer pra fora do método da pool
            });
        }
    );
}
