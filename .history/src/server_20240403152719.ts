import fastify from "fastify";
import {serializerCompiler, validatorCompiler, ZodTypeProvider} from "fastify-type-provider-zod" 
import {z} from 'zod';
import {PrismaClient} from '@prisma/client'; 


const app = fastify();
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

const prisma = new PrismaClient({
    log: ['query'],
})




app.listen({port: 3333}).then(() => {
    console.log('HTTP server running!')
})