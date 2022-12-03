import React, { useState } from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import book from '../assets/1669710767251.pdf';
import { Buttons, Container } from './BooksDisplay.styled';

const BooksDisplay = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  // If loaded get the number of PDF pages
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  // @GET
  // desc: Fetches books from server
  fetch('http://localhost:4000/getBooks', {
    method: 'GET',
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });

  // Changes the page
  function changePage() {
    setPageNumber(25);
  }

  return (
    <div>
      <Document file={book} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} pageIndex={2} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
      <Container>
        <Buttons className="prev-page">
          <i class="fa fa-chevron-left" aria-hidden="true"></i>
        </Buttons>
        <Buttons className="next-page" onClick={changePage}>
          <i class="fa fa-chevron-right" aria-hidden="true"></i>
        </Buttons>
      </Container>
    </div>
  );
};

export { BooksDisplay };
