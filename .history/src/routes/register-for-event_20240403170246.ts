import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import {prisma} from '../lib/prisma'; 
import { z } from "zod";




export async function registerForEvent(app: FastifyInstance){
    app
        .withTypeProvider<ZodTypeProvider>()
        .post('/events/:eventId/attendees', {
            schema: {
                body: z.object({
                    name: z.string().min(4, "Nome inválido."),
                    email: z.string().email("Email inválido."),
                }),
                params: z.object({
                    eventId: z.string().uuid(),
                }),
                response: {
                    201: z.object({
                        attendeeId: z.number()
                    })
                }
            }
        } ,async (request, reply) => {

            const {eventId} = request.params;
            const {name, email} = request.body;

            const attendeesExistEmail = await prisma.attendees.findUnique({
                where: {
                    eventid_email: {
                        email,
                        eventid: eventId
                    }
                }
            })

            if(attendeesExistEmail !== null){
                throw new Error('Este e-mail já existe.')
            }

            const result await Promise.all([
                prisma.events.findUnique({
                    where: {
                        id: eventId,
                    }
                }),
                prisma.attendees.count({
                    where:{
                        eventid: eventId
                    }
                })
            ])
           

            if(evento?.maximum_attendess && numeroTotalParticipante >= evento.maximum_attendess ){
                throw new Error('Limite máximo de participantes no evento ')

            }

            const attendee = await prisma.attendees.create({
                data: {
                    name,
                    email,
                    eventid: eventId,
                }
            })

            return reply.status(201).send({attendeeId: attendee.id })

        })
}