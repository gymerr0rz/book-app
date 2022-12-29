const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const fs = require('fs');
require('dotenv').config();
require('../schemas/BookSchema');
const Grid = require('gridfs-stream');
const axios = require('axios');
const conn = mongoose.createConnection(process.env.MONGO_LOCAL);
const upload = require('../middleware/uploadBook');
const Book = mongoose.model('Book');
const { PDFDocument } = require('pdf-lib');
const bcrypt = require('bcrypt');
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
    let str = pdfDoc.getTitle();
    let strSplit = str.split(' -');
    let pdfTitle = strSplit[0];
    let pdfPages = pdfDoc.getPageCount();
    let file = getCover(pdfTitle);
  });

  // Get covers from GOOGLE API by comparing book name and then rendering cover
  async function getCover(book) {
    await axios
      .get('https://www.googleapis.com/books/v1/volumes?q=intitle:' + book)
      .then((response) => response.data)
      .then(async (data) => {
        const item = data.items[0];
        const title = item.volumeInfo.title;
        const author = item.volumeInfo.authors[0];
        const a = item.volumeInfo.imageLinks.thumbnail;
        const b = a.split('zoom=1').join('zoom=1');
        const c = b.split('http').join('https');
        const thumbnail = c;
        const compareTitle = book;
        const hashTitle = await bcrypt.hash(title, 5);
        const crypto = hashTitle.split('/').join('-');
        arr.push({ title, author, thumbnail, compareTitle, crypto });
      });
  }
  setTimeout(() => {
    console.log('Books send to the front end.');
    res.send(arr);
  }, 3000);
});

module.exports = router;
