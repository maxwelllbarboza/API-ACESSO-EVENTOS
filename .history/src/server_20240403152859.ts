import fastify from "fastify";
import {serializerCompiler, validatorCompiler, ZodTypeProvider} from "fastify-type-provider-zod" 
import {z} from 'zod';



const app = fastify();
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);


app.listen({port: 3333}).then(() => {
    console.log('HTTP server running!')
})