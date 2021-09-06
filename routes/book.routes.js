// ROUTES FILE NEEDS TO BE REQUIRED IN THE APP.JS IN ORDER NOT TO GIVE 404
// APP NEEDS TO KNOW YOU CREATED A NEW ROUTE FILE, THAT'S THE ONLY WAY FOR IT TO KNOW WHICH ROUTES YOU WANT TO HIT

const express = require('express');

const router = express.Router();

// ********* require Book model in order to use it *********
const Book = require('../models/Book.model');
const Author = require('../models/Author.model');

router.get(
  "/new",
  (req, res)=>{
    Author.find().then(allAuthors => {
      res.render("new-book", {allAuthors});
    }).catch(err => console.log(err))
 })
// This is the twin routes way that we saw on friday
/* router.route("/new")
.get((req, res)=>{
  res.render("new-book")
})
.post((req, res)=>{
  // Create entity here
}) */

// ****************************************************************************************
// GET route for displaying the book details page
// ****************************************************************************************
router.get("/:id", (req, res)=>{
  Book.findById(req.params.id)
  .populate('author')
  .then((book)=> {
    res.render('book-details', book)
  })
})

 // The HTML insterface does not allow the delete verb to be sent in a request
// router.delete("/:id", (req, res)=>{
//   res.send(`Deleted book ${req.params.id}`)
// })

router.get('/:id/delete', (req, res)=>{
  Book.findByIdAndDelete(req.params.id)
  .then(deletedBook => res.redirect('/books'))
  .catch(err => console.log(err))
})


// The HTML insterface does not allow the delete verb to be sent in a request
/*
router.put("/:id", (req, res)=>{
  res.send(`Edited book ${req.params.id}`)
})
*/
router.route("/:id/edit")
.get((req, res)=>{
  Book.findById(req.params.id)
  .then(book=>res.render("book-edit", book))
  
})
.post((req, res)=>{
  const {title, author, description, rating} = req.body
  Book.findByIdAndUpdate(
    req.params.id,
    {title, author, description, rating}
  )
  .then(updateBook => res.redirect(`/books/${req.params.id}`))
  .catch(error => console.log(error))
})



// ****************************************************************************************
// GET route to display all the books
// ****************************************************************************************
// You already have "/books" in the app.js, herefore you start with a simple "/". This is called the base path for your DB entity (MongoDB Document)
router.get('/', (req, res) => { // What URL does this answer?
  Book.find()
  .then(books => {
    res.render('books-list', {books})})
   // You have to continue coding the route
});
//create new book
router.post(
  "/",
  (req, res)=>{
  const {title, author, description, rating} = req.body
  Book.create({title, author, description, rating})
  .then(newBook => res.redirect("/books/"))
})


module.exports = router;
