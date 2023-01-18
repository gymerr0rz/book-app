const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const fs = require('fs');
require('dotenv').config();
require('../schemas/BookSchema');
const Grid = require('gridfs-stream');
const axios = require('axios');
const conn = mongoose.createConnection(process.env.MONGO_SERVER);
const upload = require('../middleware/uploadBook');
const path = require('path');
const { PDFDocument } = require('pdf-lib');
const bcrypt = require('bcrypt');

const BOOK_PATH = '../books/';
const PDF_CONTENT_TYPE = 'application/pdf';
let gfs;

conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('book');
  return gfs;
});

// Receives file from front-end and stores into /books
router.post('/uploadBook', upload.single('file'), (req, res) => {
  console.log(req.file);
  res.json({ file: req.file });
});

router.get('/whichBookOpened/:id', (req, res) => {
  // Getting the bookName from the body and then editing it.
  const reqBody = req.params.id;
  const result = reqBody.toLowerCase();
  // Going through dir and comparing names
  const readDir = fs.readdirSync('./books');
  let matchFound = false;
  readDir.forEach(async (book) => {
    console.log('Loading book...');
    if (matchFound) return;
    let a = fs.readFileSync('./books/' + book);
    let pdfDoc = await PDFDocument.load(a, { ignoreEncryption: true });
    let str = pdfDoc.getTitle().toLowerCase();

    try {
      if (str.includes(' -')) {
        let strSplit = str.split(' -');
        let pdfTitle = strSplit[0];
        console.log(`Comparing ${pdfTitle} and ${result}`);
        if (pdfTitle === result) {
          matchFound = true;
          if (!res.headersSent) {
            const dirPath = path.join(__dirname, BOOK_PATH + book);
            res.setHeader('Content-Type', PDF_CONTENT_TYPE);
            res.setHeader(
              'Content-Disposition',
              'attachment; filename=file.pdf'
            );
            res.setHeader('Content-Length', fs.statSync(dirPath).size);
            fs.createReadStream(dirPath).pipe(res);
          }
        }
      } else if (str.includes(':')) {
        let strSplit = str.split(':');
        let pdfTitle = strSplit[0];
        console.log(`Comparing ${pdfTitle} and ${result}`);
        if (pdfTitle === result) {
          matchFound = true;
          if (!res.headersSent) {
            const dirPath = path.join(__dirname, BOOK_PATH + book);
            res.setHeader('Content-Type', PDF_CONTENT_TYPE);
            res.setHeader(
              'Content-Disposition',
              'attachment; filename=file.pdf'
            );
            res.setHeader('Content-Length', fs.statSync(dirPath).size);
            fs.createReadStream(dirPath).pipe(res);
          }
        }
      } else if (str.includes('_')) {
        let strSplit = str.split('_');
        let pdfTitle = strSplit[0];
        console.log(`Comparing ${pdfTitle} and ${result}`);
        if (pdfTitle === result) {
          matchFound = true;
          if (!res.headersSent) {
            const dirPath = path.join(__dirname, BOOK_PATH + book);
            res.setHeader('Content-Type', PDF_CONTENT_TYPE);
            res.setHeader(
              'Content-Disposition',
              'attachment; filename=file.pdf'
            );
            res.setHeader('Content-Length', fs.statSync(dirPath).size);
            fs.createReadStream(dirPath).pipe(res);
          }
        }
      } else if (str.includes(',,')) {
        let strSplit = str.split(' ,,');
        let pdfTitle = strSplit[0];
        console.log(`Comparing ${pdfTitle} and ${result}`);
        if (pdfTitle === result) {
          matchFound = true;
          if (!res.headersSent) {
            const dirPath = path.join(__dirname, BOOK_PATH + book);
            res.setHeader('Content-Type', PDF_CONTENT_TYPE);
            res.setHeader(
              'Content-Disposition',
              'attachment; filename=file.pdf'
            );
            res.setHeader('Content-Length', fs.statSync(dirPath).size);
            fs.createReadStream(dirPath).pipe(res);
          }
        }
      } else {
        console.log(`Comparing ${str} and ${result}`);
        if (str === result) {
          matchFound = true;
          if (!res.headersSent) {
            const dirPath = path.join(__dirname, BOOK_PATH + book);
            res.setHeader('Content-Type', PDF_CONTENT_TYPE);
            res.setHeader(
              'Content-Disposition',
              'attachment; filename=file.pdf'
            );
            res.setHeader('Content-Length', fs.statSync(dirPath).size);
            fs.createReadStream(dirPath).pipe(res);
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  });
});

// Receives books and sends them to the front-end
router.get('/getBooks', (req, res) => {
  const readDir = fs.readdirSync('./books');
  const arr = [];
  readDir.forEach(async (book) => {
    try {
      let a = fs.readFileSync('./books/' + book);
      let pdfDoc = await PDFDocument.load(a, { ignoreEncryption: true });
      let pdfAuthor = pdfDoc.getAuthor();
      let str = pdfDoc.getTitle();
      // str.replace(/[^a-z]/gi, '');
      if (str.includes(' -')) {
        let strSplit = str.split(' -');
        let pdfTitle = strSplit[0];
        console.log(pdfTitle);
        getCover(pdfTitle);
      } else if (str.includes(':')) {
        let strSplit = str.split(':');
        let pdfTitle = strSplit[0] + ' by ' + pdfAuthor;
        console.log(pdfTitle);
        getCover(pdfTitle);
      } else if (str.includes(',,')) {
        let strSplit = str.split(' ,,');
        let pdfTitle = strSplit[0] + ' by ' + pdfAuthor;
        console.log(pdfTitle);
        getCover(pdfTitle);
      } else {
        const pdfTitle = str + ' by ' + pdfAuthor;
        getCover(pdfTitle);
      }
    } catch (err) {
      console.log(err);
    }
  });

  // Get covers from GOOGLE API by comparing book name and then rendering cover
  async function getCover(book) {
    await axios
      .get('https://www.googleapis.com/books/v1/volumes?q=intitle:' + book)
      .then((response) => response.data)
      .then(async (data) => {
        if (data.totalItems === 0) {
          console.log('No Items for: ' + book);
        } else {
          try {
            const item = data.items[0];
            const title = item.volumeInfo.title;
            const desc = item.volumeInfo.description;
            const author = item.volumeInfo.authors[0];
            const a = item.volumeInfo.imageLinks.thumbnail;
            const b = a.split('zoom=1').join('zoom=1');
            const c = b.split('http').join('https');
            const thumbnail = c;
            const compareTitle = book;
            const hashTitle = await bcrypt.hash(title, 5);
            const crypto = hashTitle.split('/').join('-');
            arr.push({ title, author, thumbnail, compareTitle, crypto, desc });
          } catch (err) {
            console.log(err);
          }
        }
      });
  }
  setTimeout(() => {
    console.log('Books send to the front end.');
    res.send(arr);
  }, 5000);
});

module.exports = router;
