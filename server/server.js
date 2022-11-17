const express = require('express');
require('dotenv').config();
const PORT = 3000;
const EPub = require('epub');

let epub = new EPub('./assets/book1.epub', '/images/', '/links/');

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
const app = express();

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
