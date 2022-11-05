import fastify, { FastifyInstance as httpServerInstance } from "fastify";
import { IncomingMessage, Server, ServerResponse } from 'http';
import { bootstrap } from "fastify-decorators";
import { resolve } from "path";

export type httpServer = httpServerInstance<Server, IncomingMessage, ServerResponse>

async function serve(): Promise<httpServer> {
    const serve = fastify({
        requestTimeout: 30,
        trustProxy: true,
        logger: true
    });

    return serve;
}

export default async () => {

    const app = await serve();

    await app.register(require('@fastify/formbody'))
    await app.register(require('@fastify/cors'), {
        origin: '*',
    })

    // await app.register(bootstrap, {
    //     directory: resolve(__dirname, '..'),
    //     mask: /\.controller\.[j|t]s$/
    // })

    app.get("/", async (req, reply) => {
        reply.status(200).send("Welcome to Signals Flix API");
    })


    return app;
}