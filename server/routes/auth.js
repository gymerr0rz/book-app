const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = 'ABCDEFGHIJKLMNOPQRSTVUXZY123456789';
require('../schemas/UserSchema');
const User = mongoose.model('UserInfo');

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
  if (token) {
    const user = jwt.verify(token, JWT_SECRET);
    const useremail = user.email;
    User.findOne({ email: useremail })
      .then((data) => {
        return res.json({ status: 'success', data: data });
      })
      .catch((error) => {
        res.json({ status: 'error', data: error });
      });
  } else {
    res.status(404).send({
      message: 'User not logged in.',
    });
  }
});

module.exports = router;
