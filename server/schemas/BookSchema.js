const { Schema, mongoose } = require('mongoose');

const bookSchema = new Schema({
  data: {
    type: Object,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

mongoose.model('Book', bookSchema);
