const express = require('express');
const router = express.Router();
require('../schemas/UserSchema');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = mongoose.model('UserInfo');
const jwt = require('jsonwebtoken');
const Cookies = require('cookies');
const JWT_SECRET = 'ABCDEFGHIJKLMNOPQRSTVUXZY123456789';
const EPub = require('epub');
const { parse } = require('dotenv');

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

function parsingBook(book) {
  let epub = new EPub(book, '/images/', '/links/');
  epub.on('end', function () {
    // epub is initialized now
    console.log(epub.metadata);
    epub.flow.forEach(function (chapter) {
      // console.log(chapter.id);
    });
    epub.getChapter('titlepage', (error, text) => {
      console.log(text);
    });
  });

  epub.parse();
}

router.post('/books', (req, res) => {
  console.log(req.body);
  const { token, book } = req.body;
  const user = jwt.verify(token, JWT_SECRET);
  const useremail = user.email;

  User.findOne({ email: useremail })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      res.json({ status: 'error', data: error });
    });
  console.log(req.params);
});

module.exports = router;
// let epub = new EPub('./assets/book1.epub', '/images/', '/links/');

// epub.on('end', function () {
//   // epub is initialized now
//   console.log(epub.metadata);
//   epub.flow.forEach(function (chapter) {
//     // console.log(chapter.id);
//   });
//   epub.getChapter('titlepage', (error, text) => {
//     console.log(text);
//   });
// });

// epub.parse();
