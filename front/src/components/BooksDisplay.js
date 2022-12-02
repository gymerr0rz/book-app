import React, { useState } from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import book from '../assets/1669710767251.pdf';

const BooksDisplay = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  let arr;
  fetch('http://localhost:4000/getBooks', {
    method: 'GET',
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });

  return (
    <div>
      <Document file={book} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  );
};

export { BooksDisplay };
