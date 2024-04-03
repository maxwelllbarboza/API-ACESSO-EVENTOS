import fastify from "fastify";
import {z} from 'zod';
import {PrismaClient} from '@prisma/client'; 

const app = fastify();

const prisma = new PrismaClient({
    log: ['query'],
})


app.post('/events', async (request, reply) => {

    const createEventsSchema = z.object({
        id: z.string(),
        title: z.string().min(4, "Titulo muito pequeno"),
        details: z.string().nullable(),
       
    })
    
    const data = createEventsSchema.parse(request.body);

    const evento = await prisma.events.create({
        data: {
            id: data.id,
            title: data.title,
            details: data.details,
            maximum_attendess: data.maximum_attendess,
            slug: new Date().toISOString(),
        }
    })
    return {evento}   

})

app.listen({port: 3333}).then(() => {
    console.log('HTTP server running!')
})