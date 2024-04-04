import {} from
async function seed(){}

seed().then(()=> {
    console.log('Database seeded')
    prisma.$disconnect()
})