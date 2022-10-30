const mongoose = require('mongoose');

//User Schema or Document Structure
const bookSchema = new mongoose.Schema({
    time : {
        type : String,
        required : true,
    },
    add : {
        type : String,
        required : true,
    },
    date : {
        type : String,
        required : true
    }
})

// Create Model
const Book = new mongoose.model("BOOK",bookSchema)
module.exports = Book;