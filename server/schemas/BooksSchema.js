const { Schema, mongoose } = require('mongoose');

const bookSchema = new Schema({
  book: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

mongoose.model('BooksData', bookSchema);
