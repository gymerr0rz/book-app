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
// const { PDFDocumentProxy } = require('pdfjs-dist');
const { PDFDocument } = require('pdf-lib');
let gfs;

conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('book');
  return gfs;
});

// Recieves file from front-end and stores into /books
router.post('/uploadBook', upload.single('file'), (req, res) => {
  console.log(req.file);
  res.json({ file: req.file });
});

// Receives books and sends them to the front-end
router.get('/getBooks', (req, res) => {
  const readDir = fs.readdirSync('./books');
  const arr = [];
  readDir.forEach(async (book) => {
    let a = fs.readFileSync('./books/' + book);
    let pdfDoc = await PDFDocument.load(a);
    let pdfAuthor = pdfDoc.getAuthor();
    let pdfTitle = pdfDoc.getTitle();
    let pdfPages = pdfDoc.getPageCount();
    arr.push({ author: pdfAuthor, title: pdfTitle, pages: pdfPages });
  });
  setTimeout(() => {
    res.send(arr);
  }, 1000);
});

module.exports = router;
