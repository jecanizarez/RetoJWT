const mongoClient = require("mongodb").MongoClient;
require('dotenv').config();
const uri = process.env.DB_HOST;
const database = process.env.DB_NAME;


function mongoUtils(){
    const mu = {}; 
    mu.conn = () => {
        const client = new mongoClient(uri,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            connectTimeoutMS: 30000,
            keepAlive: 1,
            auto_reconnect: true,
        });
        return client.connect();
    }
    return mu;
}
exports.mongoUtils = mongoUtils();
exports.database = database;