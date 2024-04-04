import {ZodTypeProvider} from "fastify-type-provider-zod" 
import {z} from 'zod';
import {prisma} from '../lib/prisma'; 
import { formatarParaURL } from "../utils/generate-slug";
import { FastifyInstance } from "fastify";

export async function checkin(app: FastifyInstance){
    app.withTypeProvider
}