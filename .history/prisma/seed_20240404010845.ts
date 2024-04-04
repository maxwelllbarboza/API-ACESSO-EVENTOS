import { prisma } from "../src/lib/prisma";

async function seed(){
    await prisma
}

seed().then(()=> {
    console.log('Database seeded')
    prisma.$disconnect()
})