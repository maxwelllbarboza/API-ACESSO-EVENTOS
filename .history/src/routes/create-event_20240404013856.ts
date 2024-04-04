import {ZodTypeProvider} from "fastify-type-provider-zod" 
import {z} from 'zod';
import {prisma} from '../lib/prisma'; 
import { formatarParaURL } from "../utils/generate-slug";
import { FastifyInstance } from "fastify";


export async function createEvent(app: FastifyInstance){

    app
        .withTypeProvider<ZodTypeProvider>()
        .post('/events', {
            schema: {
                summary: 'Criar um evento.',
                tags: ['check-in'],
                body: z.object({                   
                    title: z.string().min(4, "Titulo muito pequeno"),
                    details: z.string().nullable(),
                    maximum_attendess: z.number().int("Numero só inteiro").positive("Numero tem que ser positivo").nullable(),
                }),
                response:{
                    201: z.object({
                        eventId: z.string(),
                    })
                },   
            },

        } , async (request, reply) => {
        
        const { title, details, maximum_attendess } = request.body;

        const slug = formatarParaURL(title)

        const eventoExisteMesmoSlus = await prisma.events.findUnique({
            where: {
                slug,
            }
        });

        if(eventoExisteMesmoSlus !== null){
            throw new Error('O titulo já existe.');
        }

        const evento = await prisma.events.create({
            data: {                
                title,
                details,
                maximum_attendess,
                slug,
            }
        })

        return reply.status(201).send({eventId: evento.id});
    })
}


