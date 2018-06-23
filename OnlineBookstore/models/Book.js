var mongoose = require('mongoose');

//validations

var BookSchema = new mongoose.Schema({
    isbn: String,
    title: String,
    author: String,
    shortDescription: String,
    description: String,
    publishedYear: String,
    publisher: String,
    imageURL: String,
    price: {type: Number, min: 1, max: 100},
    category: String,
    tags: [],
    reviews: [],
    published_date: { type: Date, default: Date.now },
    updated_date: { type: Date, default: Date.now },
    // selectedFile: String,
  });

  module.exports = mongoose.model('Book', BookSchema);