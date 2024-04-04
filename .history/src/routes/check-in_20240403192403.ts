import {ZodTypeProvider} from "fastify-type-provider-zod" 
import {z} from 'zod';
import {prisma} from '../lib/prisma'; 
import { formatarParaURL } from "../utils/generate-slug";
import { FastifyInstance } from "fastify";

export async function checkin(app: FastifyInstance){
    app.withTypeProvider<ZodTypeProvider>()
    .get('/attendees/:attendeeId/check-in', {
        schema: {
            params: z.object({
                atendeeId: z.coerce.number().int()
            })
        },
    }, async (request, reply) => {
        const {atendeeId} = request.params;

        const attendeeCheckIn = await prisma.checkin.findUnique({
            where: {
                attendeesId: atendeeId
                
            }
        })



    })
}