const {PrismaClient} = require('@prisma/client');


const db = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});


async function main(){
    try{
        await db.category.createMany({
            data:[
                { name: 'Famous People'},
                { name: 'Movies & TV'},
                { name: 'Musicians'},
                { name: 'Games'},
                { name: 'Animals'},
                { name: 'Philosophy'},
                { name: 'Scientists '}
            ],
            skipDuplicates: true,
        })
    }   
    catch(error)
    {
        
    console.error('Error seeding default categories:', error);
    console.error('Full error details:', error);


    } 
}

main();