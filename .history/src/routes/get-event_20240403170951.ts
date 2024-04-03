import { FastifyInstance } from "fastify"; 
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";


export async function getEvent(app:FastifyInstance){
    app.withTypeProvider<ZodTypeProvider>().get('/events/:eventId',{ 
        schema: {
            params: z.object({
                eventId: z.string().uuid(),

            }),
            response: {},
        }
    },  async (request, reply) => {
        

    })
}