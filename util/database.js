const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;


let _db

const mongoConnect = callback => {
    MongoClient.connect('mongodb+srv://dalnikcc:bVw1e1JHoz1WMNZE@devices0.85mwk.mongodb.net/?retryWrites=true&w=majority&appName=devices0')
        .then(client => {
            console.log('Connected!');
            _db = client.db();
            callback();
            // const db = client.db('devices0');
            // db.collection('products').insertOne({
            //     title: 'A Book',
            //     price: 12.99
            // });
        }).catch(err => {
            console.log(err);
            throw err;
        }); // const getDb = require('../util/database').getDb;

}

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'No database found!';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
// module.exports = mongoConnect;