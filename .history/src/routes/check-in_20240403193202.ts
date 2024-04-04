import {ZodTypeProvider} from "fastify-type-provider-zod" 
import {z} from 'zod';
import {prisma} from '../lib/prisma'; 
import { FastifyInstance } from "fastify";

export async function checkin(app: FastifyInstance){
    app
    .withTypeProvider<ZodTypeProvider>()
    .get('/attendees/:attendeeId/check-in', {
        schema: {
            params: z.object({
                attendeeId: z.coerce.number().int()
            }),
            response: {
                201: z.null(),
            }
        },
    }, async (request, reply) => {

        const {atendeeId} = request.params;

        const attendeeCheckIn = await prisma.checkin.findUnique({
            where: {
                attendeesId: atendeeId
                
            }
        })
        if(attendeeCheckIn !== null) throw new Error("Participante já fez Check-in")

        await prisma.checkin.create({
            data: {
                attendeesId: atendeeId
            }
        })

        return reply.status(201).send()
    })
}