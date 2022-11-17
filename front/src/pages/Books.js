import Navbar from '../components/Navbar';
import React from 'react';
import { BooksContainer } from './Books.styled';
import img from '../assets/no-books.svg';

const books = false;

function isBooks() {
  if (books) {
    return <h1>You have books</h1>;
  } else {
    return (
      <>
        <img src={img} alt="hello" />
        <div className="books-text">
          <h1>Wanna read a book?</h1>
          <p>Import a book so you can use features like bookmarking and etc.</p>
          <button>Import</button>
        </div>
      </>
    );
  }
}

const BooksPage = () => {
  return (
    <>
      <BooksContainer>{isBooks()}</BooksContainer>
    </>
  );
};

export default BooksPage;
