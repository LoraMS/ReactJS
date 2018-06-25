var mongoose = require('mongoose');

//validations

var EventSchema = new mongoose.Schema({
    title: String,
    description: String,
    eventDate: Date,
    hours: String,
    imageURL: String,
    category: String,
    reviews: [],
    published_date: { type: Date, default: Date.now },
  });

  module.exports = mongoose.model('Event', EventSchema);