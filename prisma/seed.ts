import { prisma } from "../src/lib/prisma";

async function seed(){
    await prisma.events.create({
        data: {
            id: 'd8ea8d56-e7fb-4b8a-907f-49e5b7e8e855',
            title: 'Unite Summit',
            slug: 'unite-summit',
            details: 'Um evento p/ devs apaixonados',
            maximum_attendess: 120,
        }
    })
}

seed().then(()=> {
    console.log('Database seeded')
    prisma.$disconnect()
})