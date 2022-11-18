const express = require('express');
require('dotenv').config();
const EPub = require('epub');
const mongoose = require('mongoose');
const routesPoints = require('./routes/routes');
const cors = require('cors');

mongoose
  .connect(process.env.MONGO_LOCAL, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('Database connected...');
  });

const app = express();

app.use(express.json());
app.use(cors());
app.use('/', routesPoints);
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

app.listen(process.env.PORT, () => {
  console.log(`Listening on ${process.env.PORT}`);
});
