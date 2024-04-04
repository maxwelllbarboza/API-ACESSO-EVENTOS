import { FastifyInstance } from "fastify"; 
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";


export async function getEventAttendees(app:FastifyInstance){
    app.withTypeProvider<ZodTypeProvider>().get('/events/:eventId/attendees',{ 
        schema: {
            params: z.object({
                eventId: z.string().uuid(),
            }),
            querystring: z.object({
                pageIndex: z.string().nullable().defaui
            }),
            response: {
               
            },
        }
    },  async (request, reply) => {
        
        const {eventId} = request.params;
        const attendees = await prisma.attendees.findMany({
            where: {
                eventid: eventId,
            },
            take: 10,
            skip: 

        })
        return reply.send({attendees});       
    })
}