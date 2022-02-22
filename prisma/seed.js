const { PrismaClient } = require('@prisma/client');

const db = new PrismaClient();

async function seed() {
    await Promise.all(
        getPosts().map(post => db.post.create({ data: post }))
    );
}

seed();

function getPosts() {
    return [
        {
            "title": "Test title one from seed file",
            "body": "Test body one from seed file"   
        },
        {
            "title": "Test title two from seed file",
            "body": "Test body two from seed file"   
        },
        {
            "title": "Test title three from seed file",
            "body": "Test body three from seed file"   
        },
        {
            "title": "Test title four from seed file",
            "body": "Test body four from seed file"   
        }
    ];
}
