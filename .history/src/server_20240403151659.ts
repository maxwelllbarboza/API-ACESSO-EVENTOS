import fastify from "fastify";
import {serializerCompiler, validatorCompiler, ZodTypeProvider} from "fastify-type-provider-zod" 
import {z} from 'zod';
import {PrismaClient} from '@prisma/client'; 
import { formatarParaURL } from "./utils/generate-slug";

const app = fastify();
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

const prisma = new PrismaClient({
    log: ['query'],
})


app.withTypeProvider<ZodTypeProvider>().post('/events', {}, async (request, reply) => {

    const createEventsSchema = z.object({
        id: z.string(),
        title: z.string().min(4, "Titulo muito pequeno"),
        details: z.string().nullable(),
        maximum_attendess: z.number().int("Numero só inteiro").positive("Numero tem que ser positivo").nullable(),
    })
    
    const {id, title, details, maximum_attendess } = createEventsSchema.parse(request.body);

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
    return reply.status(201).send({evento})    

})

app.listen({port: 3333}).then(() => {
    console.log('HTTP server running!')
})