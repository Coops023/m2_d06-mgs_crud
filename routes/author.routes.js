const express = require('express');
const router = express.Router();

const Author = require('../models/Author.model');


router.get(
  "/new",
  (req, res)=>{
  res.render("new-author")
})

router.get(
  "/:id",
  (req, res)=>{
    Author.findById(req.params.id).
    then((author)=>{
      res.render("author-details", author)
    })
  })

router.get("/:id/delete",(req, res)=>{
  Author.findByIdAndDelete(req.params.id)
  .then(deletedAuthor => res.redirect("/authors"))
  .catch(error=> console.log(error))
})

router.route("/:id/edit")
.get((req, res)=>{
  Author.findById(req.params.id)
  .then(author=>res.render("author-edit", author))
  
})
.post((req, res)=>{
  const {name, surname, nationality, bio} = req.body
  Author.findByIdAndUpdate(
    req.params.id,
    {name, surname, nationality, bio}
  )
  .then(updateAuthor => res.redirect(`/authors/${req.params.id}`))
  .catch(error => console.log(error))
})

router.get(
  '/',
  (req, res) => {
  Author.find()
  .then(allAuthors => {
    res.render('authors-list', {allAuthors})})
});

router.post(
  "/",
  (req, res)=>{
  const {name, surname, nationality, bio} = req.body
  Author.create({name, surname, nationality, bio})
  .then(newAuthor => res.redirect("/authors/"))
})


module.exports = router;