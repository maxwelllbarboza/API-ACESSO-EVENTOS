import { prisma } from "../src/lib/prisma";

async function seed(){
    await prisma.events.create
}

seed().then(()=> {
    console.log('Database seeded')
    prisma.$disconnect()
})