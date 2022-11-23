const express = require('express');
require('dotenv').config();
const EPub = require('epub');
const mongoose = require('mongoose');
const routesPoints = require('./routes/routes');
const cors = require('cors');
const bodyParser = require('body-parser');

mongoose
  .connect(process.env.MONGO_LOCAL, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('Database connected...');
  });

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(
  express.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(cors());
app.use('/', routesPoints);
app.listen(process.env.PORT, () => {
  console.log(`Listening on ${process.env.PORT}`);
});
