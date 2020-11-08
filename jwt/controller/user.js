const {mongoUtils, database} = require("../mongodb");
var ObjectId = require('mongodb').ObjectID;
const bcrypt = require('bcrypt');
const collection = "users"; 
const saltRounds = 10;



async function getUsers() {
    const client = await mongoUtils.conn(); 
    const users =  await client
    .db(database)
    .collection(collection)
    .find({})
    .toArray()
    .finally(() => client.close());
    return users;
}
async function insertUser(user) {
    user.password  = await bcrypt.hash(user.password, saltRounds );
    return mongoUtils.conn().then((client) => { 
        return client.db(database).collection(collection).insertOne(user).finally(() => client.close());
    });
    
}
async function getUser(usuario){
    try {
        const client = await mongoUtils.conn(); 
        const user =  await client
        .db(database)
        .collection(collection)
        .find({ nombre : usuario})
        .toArray()
        .finally(() => client.close());
        return user;
    } catch (error) {
        return "El mensaje no existe";
    }
}

async function updateUser(iduser, newuser){
    try {
        const client = await mongoUtils.conn(); 
        const user =  await client
        .db(database)
        .collection(collection)
        .replaceOne({_id :ObjectId(iduser+"")}, newuser)
        .finally(() => client.close());
        return user;
    } catch (error) {
        return "El mensaje a actualizar no existe";
    }
}
async function deleteUser(usuario){
    try {
        const client = await mongoUtils.conn(); 
        const user =  await client
        .db(database)
        .collection(collection)
        .deleteOne({ nombre : usuario })
        .finally(() => client.close());
        return user;

    } catch (error) {
        return "El mensaje a eliminar no existe";
    }

}

module.exports = [insertUser, getUser, getUsers, updateUser, deleteUser];