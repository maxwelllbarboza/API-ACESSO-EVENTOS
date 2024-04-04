import { prisma } from "../src/lib/prisma";

async function seed(){
    await prisma.events.create({
        data: {
            id: '',
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