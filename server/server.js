const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const uploadRouter = require('./routes/upload');
const cors = require('cors');
const methodOverride = require('method-override');
const authRouter = require('./routes/auth');

mongoose
  .connect(process.env.MONGO_SERVER, {
    useNewUrlParser: true,
  })
  .then((db) => {
    console.log('Database connected...');
  });

const app = express();

app.use(methodOverride('_method'));
app.use(express.json({ limit: '50mb' }));
app.use(
  express.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(cors());
app.use('/', uploadRouter);
app.use('/auth/', authRouter);

app.listen(process.env.PORT, () => {
  console.log(`Listening on ${process.env.PORT}`);
});
