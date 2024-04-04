import { prisma } from "../src/lib/prisma";

async function seed(){
    await prisma.events.create({
        data: {
            id: '',
            title: 'Unite Summit',
            slug: 'unitee
        }
    })
}

seed().then(()=> {
    console.log('Database seeded')
    prisma.$disconnect()
})