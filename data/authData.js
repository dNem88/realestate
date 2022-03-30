
async function findUser(username, req) {
    const user = await req.app.locals.client.db('realestate').collection('users').findOne({'username': username});
    return user;
}

module.exports = {
    findUser
}