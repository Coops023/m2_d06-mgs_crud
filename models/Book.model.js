const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const bookSchema = new Schema(
  {
    // Desine Book schema here
    title: String, 
    description: String,
    author: {type: Schema.Types.ObjectId, ref: "Author"}, //_id
    rating: Number
  },
  {
    timestamps: true
  }
);

// const Book = model('Book', bookSchema);
// module.exports = Book;

module.exports = model('Book', bookSchema);
