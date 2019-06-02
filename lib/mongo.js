const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

class DbConnection {
    constructor() { }

    async connect(callback) {
        // Connection URL
        const url = 'mongodb://localhost:27017/inquizy';
        // Database Name
        const dbName = 'inquizy';
        const client = new MongoClient(url);

        try {
            // Use connect method to connect to the Server
            await client.connect();

            const db = await client.db(dbName);
            await callback(db);
        } catch (err) {
            console.log(err.stack);
        }

        client.close();
    }
}

module.exports = new DbConnection();