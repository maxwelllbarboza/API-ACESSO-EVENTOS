import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function getAttendeeBadge(app:FastifyInstance){

    app
        .withTypeProvider<ZodTypeProvider>()
        .get('/attendees/:attendeeId/badge', {
            schema: {
                params: z.object({
                    attendeeId: z.coerce.number().int(),
                }),
                response: {

                },
            }


        }, async (request, reply) => {

            const {attendeeId} = request.params;

            const attendee = await prisma.attendees.findUnique({
                select: {
                    name: true,
                    email: true,
                    event

                },
                where: {
                    id: attendeeId,
                }
            })

            if(attendee === null){
                throw new Error("Participante não encontrado")
            }
            return reply.send({attendee})
        })
}