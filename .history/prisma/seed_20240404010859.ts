import { prisma } from "../src/lib/prisma";

async function seed(){
    await prisma.events.create({
        data: {}
    })
}

seed().then(()=> {
    console.log('Database seeded')
    prisma.$disconnect()
})