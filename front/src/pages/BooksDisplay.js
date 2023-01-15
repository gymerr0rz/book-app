import React, { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf/dist/esm/entry.webpack';
import { BooksContainer, Buttons, Container } from './BooksDisplay.styled';
import axios from 'axios';

const BooksDisplay = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [secondPageNumber, setsecondPageNumber] = useState(2);
  const [pdfData, setPdfData] = useState(null);

  const path = window.location.pathname;
  const fullpath = path.split('/')[2];

  useEffect(() => {
    axios
      .get(`http://localhost:4000/whichBookOpened/${fullpath}`, {
        responseType: 'arraybuffer',
      })
      .then((response) => {
        setPdfData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // If loaded get the number of PDF pages
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  // Next page
  function nextPage() {
    let a = pageNumber;
    a++;
    setPageNumber(a);

    let b = secondPageNumber;
    b++;
    setsecondPageNumber(b);
  }

  // Prev page
  function prevPage() {
    let a = pageNumber;
    a--;
    setPageNumber(a);
    let b = secondPageNumber;
    b--;
    setsecondPageNumber(b);
  }

  return (
    <BooksContainer>
      <Document
        className="documentStyling"
        file={pdfData}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page className="pageStyling" pageNumber={pageNumber} pageIndex={2} />
        <Page
          className="pageStyling"
          pageNumber={secondPageNumber}
          pageIndex={2}
        />
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
