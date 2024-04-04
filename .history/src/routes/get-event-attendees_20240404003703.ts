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
                query: z.string().nullish(),
                pageIndex: z.string().nullable().default('0').transform(Number),
            }),
            response: {
               
            },
        }
    },  async (request, reply) => {
        
        const {eventId} = request.params;
        const { pageIndex, query } = request.query;


        const attendees = await prisma.attendees.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                createdat: true,
                checkin: {
                    select: {
                        createdat: true,
                    }
                }
            },
            where: query ?  {
                eventid: eventId,
                name: {
                    contains: query,
                }
            }: {
                eventid: eventId,
            },
            take: 10,
            skip: pageIndex * 10,

        })
        return reply.send({
            attendees: attendees.map(atendee  => {
                return {
                    id: atendee.id,
                    name: atendee.name,
                    email: atendee.email,
                    createdat: atendee.createdat,
                    checkedInAt: atendee.checkin?.createdat,
                }

            })
        });       
    })
}