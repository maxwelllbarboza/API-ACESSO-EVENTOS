import {serializerCompiler, validatorCompiler, ZodTypeProvider} from "fastify-type-provider-zod" 
import {z} from 'zod';
import {prisma} from '@prisma/client'; 

import { formatarParaURL } from "./utils/generate-slug";



app
    .withTypeProvider<ZodTypeProvider>()
    .post('/events', {
        schema: {
            body: z.object({
                id: z.string(),
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
    
    const {id, title, details, maximum_attendess } = request.body;

    const slug = formatarParaURL(title)

    const eventoExisteMesmoSlus = await prisma.events.findUnique({
        where: {
            slug,
        }
    })

    if(eventoExisteMesmoSlus !== null){
        throw new Error('O titulo já existe.');
    }

    const evento = await prisma.events.create({
        data: {
            id,
            title,
            details,
            maximum_attendess,
            slug,
        }
    })
    return reply.status(201).send({eventId: evento.id})    

})