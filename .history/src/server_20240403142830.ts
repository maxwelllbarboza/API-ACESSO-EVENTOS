import fastify from "fastify";
import {z} from 'zod';
import {PrismaClient} from '@prisma/client'; 

const app = fastify();

const prisma = new PrismaClient({
    log: ['query'],
})


app.post('/events', async (request, reply) => {

    const createEventsSchema = z.object({
        id
        title: z.string().min(4, "Titulo muito pequeno"),
        details: z.string().nullable(),
        maximum_attendess: z.number().int("Numero só inteiro").positive("Numero tem que ser positivo").nullable(),
    })
    
    const data = createEventsSchema.parse(request.body);

    const evento = await prisma.events.create({
        data: {
            id: "1",
            title: data.title,
            details: data.details,
            maximum_attendess: data.maximum_attendess,
            slug: new Date().toISOString(),
        }
    })

    reply.send({data: data})

   

})