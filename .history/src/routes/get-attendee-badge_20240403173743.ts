import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";

export async function getAttendeeBadge(app:FastifyInstance){

    app
        .withTypeProvider<ZodTypeProvider>()
        .get('/attendees/:attendeeId/badge', {
            schema:


        } , async (request, reply) => {

        })

}