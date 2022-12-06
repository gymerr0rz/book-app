const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const fs = require('fs');
require('dotenv').config();
require('../schemas/BookSchema');
const Grid = require('gridfs-stream');
const conn = mongoose.createConnection(process.env.MONGO_LOCAL);
const upload = require('../middleware/uploadBook');
const Book = mongoose.model('Book');
const pdf = require('pdf-parse');
let gfs;

conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('book');
  return gfs;
});

router.post('/uploadBook', upload.single('file'), (req, res) => {
  console.log(req.file);
  res.json({ file: req.file });
});

function getCoverArt(file) {
  exportImages(file, 'covers')
    .then((images) => console.log('Exported', images.length, 'images'))
    .catch(console.error);
}

router.get('/getBooks', (req, res) => {
  const readDir = fs.readdirSync('./books');
  const arr = [];
  readDir.forEach((book) => {
    let a = fs.readFileSync('./books/' + book);
    pdf(a)
      .then((file) => arr.push(file.info))
      .catch((err) => console.log(err));
  });
  setTimeout(() => {
    res.send(arr);
  }, 5000);
});

module.exports = router;
