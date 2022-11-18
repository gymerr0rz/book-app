const express = require('express');
const router = express.Router();
require('../schemas/UserSchema');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = mongoose.model('UserInfo');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'ABCDEFGHIJKLMNOPQRSTVUXZY123456789';

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.send({ error: 'User exists...' });
    }
    await User.create({
      username,
      email,
      password: encryptedPassword,
    });
    res.send({ status: 'success' });
  } catch (err) {
    res.send({ status: 'error', content: err });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.send({ error: 'User Not Found!' });
    }
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ email: user.email }, JWT_SECRET);

      if (res.status(201)) {
        return res.json({ status: 'success', data: token });
      } else {
        return res.json({ error: 'error' });
      }
    }
  } catch (err) {
    console.log(err);
  }
  res.json({ status: 'error', error: 'Invalid Password!' });
});

module.exports = router;
