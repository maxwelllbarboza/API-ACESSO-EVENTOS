import fastify from "fastify";
import {serializerCompiler, validatorCompiler} from "fastify-type-provider-zod";
import { createEvent } from "./routes/create-event";
import { registerForEvent } from "./routes/register-for-event";
import { getEvent } from "./routes/get-event";
import { getAttendeeBadge } from "./routes/get-attendee-badge";
import { checkin } from "./routes/check-in";
import { getEventAttendees } from "./routes/get-event-attendees";

const app = fastify();
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);


app.register(createEvent)
app.register(registerForEvent)
app.register(getEventAttendees)
app.register(getEvent)
app.register(getAttendeeBadge)
app.register(checkin)


app.listen({port: 3333}).then(() => {
    console.log('HTTP server running!')
})