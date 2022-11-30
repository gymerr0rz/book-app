import React, { useState } from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';

function createBook(data) {
  const root = document.querySelector('.root');
  root.innerHTML = `
    <div>
      <Document file="somefile.pdf" onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
    `;
}

const BooksDisplay = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  fetch('http://localhost:4000/getBooks', {
    method: 'GET',
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.length > 0) {
        createBook(data);
      }
    });

  return <h1>Hello World</h1>;
};

export { BooksDisplay };
