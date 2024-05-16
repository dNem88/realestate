const clientPromise = require('../config/database');

async function findUser(username, req) {
    const client = await clientPromise;
    const db = client.db('realestate')
    const user = await db.collection('users').findOne({'username': username});
    return user;
}

module.exports = {
    findUser
}