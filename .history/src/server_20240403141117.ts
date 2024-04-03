import fastify from "fastify";
import {object, z} from 'zod';

const app = fastify();


app.post('events', (request, reply) => {

    const createeventsSchema = z.object({
        title
    }) 

})