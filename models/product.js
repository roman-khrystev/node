const Cart = require('./cart');
const db = require('../util/database');

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    return db.execute(
      'INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)', // against injection
      [this.title, this.price, this.imageUrl, this.description]
    );
  }

  static deleteById(id) { 
  }

  static fetchAll(cb) {
    return db.execute('SELECT * FROM products');
        
  }

  static findById(id, cb) {
   db.execute('SELECT * FROM products WHERE products.id = ?', [id]) // against injection
    .then(([rows, fieldData]) => {
      cb(rows[0]);
    })
    .catch(err => console.log(err));
  }
};
