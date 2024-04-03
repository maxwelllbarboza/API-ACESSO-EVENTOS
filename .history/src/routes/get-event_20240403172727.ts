import { FastifyInstance } from "fastify"; 
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";


export async function getEvent(app:FastifyInstance){
    app.withTypeProvider<ZodTypeProvider>().get('/events/:eventId',{ 
        schema: {
            params: z.object({
                eventId: z.string().uuid(),

            }),
            response: {
                200: {
                    event: z.object({
                        id: z.string(),
                        title,
                        slug,
                        details
                        maximum_attendess
                        attendeesAmount
                    })

                }
            },
        }
    },  async (request, reply) => {
        
        const {eventId} = request.params;

        const evento = await prisma.events.findUnique({
            select: {
                id: true,
                title: true,
                slug: true,
                details: true,
                maximum_attendess: true,
                _count: {
                    select: {
                        attendees: true,
                    }
                }
            },
            where: {
                id: eventId,
            }
        });

        if (evento === null){
            throw new Error('Evento não encontrado');
        }

        return reply.send({
            event: {
                id: evento.id,
                title: evento.title,
                slug: evento.slug,
                details: evento.details,
                maximum_attendess: evento.maximum_attendess,
                attendeesAmount: evento._count.attendees,
            }
        })

    })
}