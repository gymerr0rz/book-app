const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
require('dotenv').config();
const JWT_SECRET = 'ABCDEFGHIJKLMNOPQRSTVUXZY123456789';
require('../schemas/UserSchema');
const User = mongoose.model('UserInfo');
const Grid = require('gridfs-stream');
const conn = mongoose.createConnection(process.env.MONGO_LOCAL);
const upload = require('../middleware/uploadBook');
const pdf = require('pdf-parse');
let gfs;

conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('book');
  return gfs;
});

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

router.post('/uploadBook', upload.single('file'), (req, res) => {
  console.log(req.file);
  res.json({ file: req.file });
});

router.get('/getBooks', (req, res) => {
  const arr = [];
  const fileData = [];
  const files = fs.readdirSync('./books');
  files.forEach((file) => {
    arr.push(fs.readFileSync('./books/' + file));
  });
  arr.map((a) => {
    pdf(a).then((b) => fileData.push(b));
  });
  setTimeout(() => {
    res.send(fileData);
  }, 2000);
});

module.exports = router;
