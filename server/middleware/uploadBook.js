const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'books/');
  },
  filename: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    console.log(ext);
    cb(null, Date.now() + ext);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (
      file.mimetype == 'application/pdf' ||
      file.mimetype == 'application/epub+zip'
    ) {
      cb(null, true);
    } else {
      console.log(console.log('only epub and pdf files supported!'));
      cb(null, false);
    }
  },
  limit: {
    fileSize: 1024 * 1024 * 2,
  },
});

module.exports = upload;
