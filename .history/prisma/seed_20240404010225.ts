import { prisma } from "../src/"
async function seed(){}

seed().then(()=> {
    console.log('Database seeded')
    prisma.$disconnect()
})