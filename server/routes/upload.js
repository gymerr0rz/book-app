const express = require('express');
const router = express.Router();
const fs = require('fs');
require('dotenv').config();
require('../schemas/BookSchema');
const axios = require('axios');
const upload = require('../middleware/uploadBook');
const path = require('path');
const { PDFDocument } = require('pdf-lib');
const bcrypt = require('bcrypt');
const epubParser = require('epub-parser');
const BOOK_PATH = '../books/';
const PDF_CONTENT_TYPE = 'application/pdf';
// Receives file from front-end and stores into /books
router.post('/uploadBook', upload.single('file'), (req, res) => {
  console.log(req.file);
  res.json({ file: req.file });
});

function splitString(string) {
  // console.log(`Recieved ${string}`);
  for (let i = 0; i < string.length; i++) {
    if (string.codePointAt([i]) < 65 || string.codePointAt([i]) > 122) {
      if (string.codePointAt([i]) !== 32) {
        const result = string.split(string[i])[0];
        return result;
      }
    }
  }
  return string;
}

router.get('/whichBookOpened/:id', (req, res) => {
  // Getting the bookName from the body and then editing it.
  const reqBody = req.params.id;
  const result = reqBody.toLowerCase();
  // Going through dir and comparing names
  const readDir = fs.readdirSync('./books');
  let matchFound = false;
  readDir.forEach(async (book) => {
    if (book.includes('.epub')) {
      console.log('EPUB File');
    }

    if (book.includes('.pdf')) {
      console.log('Loading book...');
      if (matchFound) return;
      let a = fs.readFileSync('./books/' + book);
      let pdfDoc = await PDFDocument.load(a, { ignoreEncryption: true });
      let str = pdfDoc.getTitle().toLowerCase();
      try {
        const bookTitle = splitString(str);
        console.log(`Comparing ${bookTitle} and ${result}`);
        if (bookTitle === result) {
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
      } catch (err) {
        console.log(err);
      }
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
      if (book.includes('.pdf')) {
        console.log(`${book} is a pdf file.`);
        let pdfDoc = await PDFDocument.load(a, { ignoreEncryption: true });
        let pdfAuthor = pdfDoc.getAuthor();
        let str = pdfDoc.getTitle();
        const title = splitString(str) + ' by ' + pdfAuthor;
        console.log(title);
        getCover(title);
      } else if (book.includes('.epub')) {
        epubParser.open('./books/' + book, function (err, epubData) {
          if (err) return console.log(err);
          const extractAuthor = epubData.easy.simpleMeta[6];
          const extractTitle = epubData.easy.simpleMeta[7];
          const author = Object.values(extractAuthor)[0];
          const title =
            splitString(Object.values(extractTitle)[0]) + ' by ' + author;
          getCover(title);
        });
      }
    } catch (err) {
      console.log(err);
    }
  });

  // Get covers from GOOGLE API by comparing book name and then rendering cover
  async function getCover(book) {
    await axios
      .get('https://www.googleapis.com/books/v1/volumes?q=' + book)
      .then((response) => response.data)
      .then(async (data) => {
        if (data.totalItems === 0) {
          console.log('No Items for: ' + book);
        } else {
          try {
            const item = data.items[0];
            const sliceBookTitle = book.split(' by');
            const title = sliceBookTitle[0];
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
    if (arr.length > 0) res.send(arr);
    else {
      res.send({
        failed: 'No books found.',
      });
    }
  }, 5000);
});

module.exports = router;
