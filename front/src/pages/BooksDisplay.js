import React, { useState } from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import book from '../assets/1669710767251.pdf';
import { BooksContainer, Buttons, Container } from './BooksDisplay.styled';

const BooksDisplay = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function removeNavBar() {
    console.log('test');
  }
  // If loaded get the number of PDF pages
  function onDocumentLoadSuccess({ numPages }) {
    const html = document.getRootNode();
    const root = html.getElementById('root').querySelector('.UgozN');
    root.remove();
    setNumPages(numPages);
  }

  // Next page
  function nextPage() {
    let a = pageNumber;
    a++;
    setPageNumber(a);
  }

  // Prev page
  function prevPage() {
    let a = pageNumber;
    a--;
    setPageNumber(a);
  }

  return (
    <BooksContainer>
      <Document file={book} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} pageIndex={2} />
      </Document>

      <p>
        Page {pageNumber} of {numPages}
      </p>
      <Container>
        <Buttons className="prev-page" onClick={prevPage}>
          <i class="fa fa-chevron-left" aria-hidden="true"></i>
        </Buttons>
        <Buttons className="next-page" onClick={nextPage}>
          <i class="fa fa-chevron-right" aria-hidden="true"></i>
        </Buttons>
      </Container>
    </BooksContainer>
  );
};

export { BooksDisplay };
