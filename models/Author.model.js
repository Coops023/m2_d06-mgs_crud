const { Schema, model } = require("mongoose");

const authorSchema = new Schema(
  {
    name: String,
    surname: String,
    nationality: String,
    bio: String
  },
  {
    timestamps: true
  }
);

const Author = model("Author", authorSchema);

module.exports = Author;