import { prisma } from "../src/lib/prisma";

async function seed(){
    await
}

seed().then(()=> {
    console.log('Database seeded')
    prisma.$disconnect()
})