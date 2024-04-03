import fastify from "fastify";
import {z} from 'zod';

const app = fastify();


app.post('events', (request, reply) => {

    const createEventsSchema = z.object({
        title: z.string(),
        details: z.string(),
        maximun_attendees: z.number(),
    }) 

})