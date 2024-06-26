import fastify from "fastify";
import {serializerCompiler, validatorCompiler} from "fastify-type-provider-zod";

const app = fastify();
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);


app.register()


app.listen({port: 3333}).then(() => {
    console.log('HTTP server running!')
})