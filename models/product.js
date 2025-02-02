const getDb = require('../util/database').getDb; // It's a function that returns the database connection. We're importing it here so that we can use it in the save method below.
const mongodb = require('mongodb');

class Product {
    constructor(title, imageUrl, price, description, id) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this._id = id ? new mongodb.ObjectId(id) : null;
    }

    save() {
        const db = getDb();
        let dbOp;
        if (this._id) {
            return db.collection('products').updateOne({ _id: _id }, { $set: this }).then(result => {
                console.log(result);
            }).catch(err => {
                console.log(err);
            });
        } else {
            dbOp = db.collection('products').insertOne(this);
        }
        return dbOp.collection('products').insertOne(this).then(result => {
            console.log(result);
        }).catch(err => {
            console.log(err);
        });
        // return db.execute(
        //     'INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)',
        //     [this.title, this.price, this.imageUrl, this.description]
        // );
    }

    static findById(prodId) {
        const db = getDb();
        return db.collection('products').find({ _id: new mongodb.ObjectId(prodId) }).next().then(product => {
            console.log(product);
            return product;
        }).catch(err => {
            console.log(err);
        });
    }

    static fetchAll() {
        const db = getDb();
        return db.collection('products').find().toArray().then(products => {
            console.log(products);
            return products;
        }).catch(err => {
            console.log(err);
        });
    }

    static deleteById(prodId) {
        const db = getDb();
        return db.collection('products').deleteOne({ _id: new mongodb.ObjectId(prodId) }).then(result => {
            console.log('Deleted');
        }).catch(err => {
            console.log(err);
        });
    }
}

module.exports = Product;
