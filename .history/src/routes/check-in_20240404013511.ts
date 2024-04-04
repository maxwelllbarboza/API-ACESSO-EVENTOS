import {ZodTypeProvider} from "fastify-type-provider-zod" 
import {z} from 'zod';
import {prisma} from '../lib/prisma'; 
import { FastifyInstance } from "fastify";

export async function checkin(app: FastifyInstance){
    app
    .withTypeProvider<ZodTypeProvider>()
    .get('/attendees/:attendeeId/check-in', {
        schema: {
            summary: 'Criar um evento'body,
            tags: [']
            params: z.object({
                attendeeId: z.coerce.number().int()
            }),
            response: {
                201: z.null(),
            }
        },
    }, async (request, reply) => {

        const {attendeeId} = request.params;

        const attendeeCheckIn = await prisma.checkin.findUnique({
            where: {
                attendeesId: attendeeId
                
            }
        })
        if(attendeeCheckIn !== null) throw new Error("Participante já fez Check-in")

        await prisma.checkin.create({
            data: {
                attendeesId: attendeeId
            }
        })

        return reply.status(201).send()
    })
}