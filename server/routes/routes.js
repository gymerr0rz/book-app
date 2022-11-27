const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = 'ABCDEFGHIJKLMNOPQRSTVUXZY123456789';
const pdf = require('pdf-parse');
require('../schemas/UserSchema');
const User = mongoose.model('UserInfo');
const { GridFsStorage } = require('multer-gridfs-storage');
const multer = require('multer');
const crypto = require('crypto');
const Grid = require('gridfs-stream');
const path = require('path');

const conn = mongoose.createConnection(process.env.MONGO_LOCAL);
let gfs;

conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('books');
});

const storage = new GridFsStorage({
  url: process.env.MONGO_LOCAL,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'books',
        };
        resolve(fileInfo);
      });
    });
  },
});
const upload = multer({ storage });

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.send({ error: 'User exists!' });
    }
    await User.create({
      username,
      email,
      password: encryptedPassword,
    });

    if (res.status(201)) {
      return res.json({ status: 'success' });
    } else {
      return res.json({ error: 'error' });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    var keys = ['keyboard cat'];
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ status: 'User Not Found!' });
    }
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ email: user.email }, JWT_SECRET);

      if (res.status(201)) {
        return res.json({ status: 'success', data: token });
      } else {
        return res.json({ status: 'error' });
      }
    }
  } catch (err) {
    console.log(err);
  }
  res.json({ status: 'error', error: 'Invalid Password!' });
});

router.post('/userData', (req, res) => {
  const { token } = req.body;
  const user = jwt.verify(token, JWT_SECRET);
  const useremail = user.email;
  User.findOne({ email: useremail })
    .then((data) => {
      return res.json({ status: 'success', data: data });
    })
    .catch((error) => {
      res.json({ status: 'error', data: error });
    });
});

router.post('/books', upload.single('file'), (req, res) => {
  console.log(req.file);
  res.json({ file: req.file });
});

router.get('/book', (req, res) => {
  gfs.files.find().toArray((err, files) => {
    // Check if files
    if (!files || files.length === 0) {
      return res.json({
        status: 'failed',
        err: 'No files exist.',
      });
    }
    return res.json(files);
  });
});

router.get('/book/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file exits
    if (!file || file.length === 0) {
      return res.json({
        status: 'failed',
        err: 'No file exist.',
      });
    }

    // Check if PDF
    if (file.contentType === 'application/pdf') {
      // Read output to browser
      pdf(file).then((data) => {
        console.log(data);
      });
    } else {
      res.statusCode(404).json({
        err: 'Not an pdf file!',
      });
    }
  });
});

module.exports = router;
// const book = req.files.filename;
// pdf(book).then(async function (data) {
//   console.log(data);
//   res.json({ status: 'success', data: data });
// });
