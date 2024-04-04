import { prisma } from "@prisma/client"
async function seed(){}

seed().then(()=> {
    console.log('Database seeded')
    prisma.$disconnect()
})