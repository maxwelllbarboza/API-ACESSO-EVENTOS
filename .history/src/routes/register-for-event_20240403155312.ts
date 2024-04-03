import { FastifyInstance } from "fastify";




export async function registerForEvent(app: FastifyInstance){
    app.withTypeProvider<Zo.withTypeProvider<ZodTypeProvider>()
}