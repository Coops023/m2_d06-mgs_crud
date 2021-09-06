// bin/seeds.js
const mongoose = require('mongoose');

const books = require("./book-data")

const Book = require('../models/Book.model');

// require database configuration
require('../configs/db.config');

Book.deleteMany()
.then(deletedBooks =>
  console.log(`Deleted ${deletedBooks.deletedCount} books`)
)
.then(
  Book.insertMany(books)
  .then(insertedBooks => {
    console.log(`Created ${insertedBooks.length} books`)
    mongoose.connection.close()}
  ))
.catch(err =>
   console.log(`An error occurred seeding books to the DB: ${err}`)
)