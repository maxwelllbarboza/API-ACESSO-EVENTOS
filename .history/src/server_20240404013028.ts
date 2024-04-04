import fastify from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import {serializerCompiler, validatorCompiler, jsonSchemaTransform} from "fastify-type-provider-zod";
import { createEvent } from "./routes/create-event";
import { registerForEvent } from "./routes/register-for-event";
import { getEvent } from "./routes/get-event";
import { getAttendeeBadge } from "./routes/get-attendee-badge";
import { checkin } from "./routes/check-in";
import { getEventAttendees } from "./routes/get-event-attendees";

const app = fastify();
app.register(fastifySwagger,{
    swagger: {
        consumes: ['application/json'],
        produces: ['appication/json'],
        info: {
            title: 'pass.in',
            description: 'API para back-end da aplicação pass.in',
            version: '1.0.0'

        },
    },
    transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
    routePrefix: 
})


app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);


app.register(createEvent)
app.register(registerForEvent)
app.register(getEvent)
app.register(getEventAttendees)
app.register(getAttendeeBadge)
app.register(checkin)


app.listen({port: 3333}).then(() => {
    console.log('HTTP server running!')
})