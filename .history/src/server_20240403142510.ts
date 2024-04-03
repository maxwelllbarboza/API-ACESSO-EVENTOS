import fastify from "fastify";
import {z} from 'zod';
import {PrismaClient} from '@prisma/client'; 

const app = fastify();

const prisma = new PrismaClient({
    log: ['query'],
})


app.post('/events', (request, reply) => {

    const createEventsSchema = z.object({
        title: z.string().min(4, "Titulo muito pequeno"),
        details: z.string().nullable(),
        maximun_attendees: z.number().int("Numero só inteiro").positive("Numero tem que ser positivo").nullable(),
    })
    
    const data = createEventsSchema.parse(request.body);

    const evento = await prisma.events.create({
        data: {
            title: data.title,
            details: data.details,
            
        }
    })

    reply.send({data: data})

   

})