import fastify from "fastify";
import {z} from 'zod';
import {PrismaClient} from '@prisma/client'; 
import { formatarParaURL } from "./utils/generate-slug";

const app = fastify();

const prisma = new PrismaClient({
    log: ['query'],
})


app.post('/events', async (request, reply) => {

    const createEventsSchema = z.object({
        id: z.string(),
        title: z.string().min(4, "Titulo muito pequeno"),
        details: z.string().nullable(),
        maximum_attendess: z.number().int("Numero só inteiro").positive("Numero tem que ser positivo").nullable(),
    })
    
    const data = createEventsSchema.parse(request.body);

    const slug = formatarParaURL(data.title)

    const eventoExisteMesmoSlus = await prisma.events.findUnique({
        where: {
            
        }
    })

    const evento = await prisma.events.create({
        data: {
            id: data.id,
            title: data.title,
            details: data.details,
            maximum_attendess: data.maximum_attendess,
            slug: slug,
        }
    })
    return reply.status(201).send({evento})    

})

app.listen({port: 3333}).then(() => {
    console.log('HTTP server running!')
})