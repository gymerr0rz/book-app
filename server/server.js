const express = require('express');
require('dotenv').config();
const uploadRouter = require('./routes/upload');
const cors = require('cors');
const methodOverride = require('method-override');

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

app.listen(process.env.PORT, () => {
  console.log(`Listening on ${process.env.PORT}`);
});
