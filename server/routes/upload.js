const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const fs = require('fs');
require('dotenv').config();
require('../schemas/BookSchema');
const Grid = require('gridfs-stream');
const conn = mongoose.createConnection(process.env.MONGO_LOCAL);
const upload = require('../middleware/uploadBook');
const pdf = require('pdf-parse');
const Book = mongoose.model('Book');
let gfs;

conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('book');
  return gfs;
});

router.post('/uploadBook', upload.single('file'), (req, res) => {
  console.log(req.file);
  res.json({ file: req.file });
  Book.create({
    data: req.file,
  });
});

router.get('/getBooks', (req, res) => {
  function toArrayBuffer(buf) {
    const ab = new ArrayBuffer(buf.length);
    const view = new Uint8Array(ab);
    for (let i = 0; i < buf.length; ++i) {
      view[i] = buf[i];
    }
    return ab;
  }
  const arr = [];
  const files = fs.readdirSync('./books');
  files.forEach((file) => {
    const fi = fs.readFileSync('./books/' + file);
    arr.push(fi);
  });
  setTimeout(() => {
    res.status(200).send(arr);
  }, 2000);
});

module.exports = router;
