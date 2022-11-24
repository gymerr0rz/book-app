import React, { Component } from 'react';
import { BooksContainer } from './Books.styled';
import img from '../assets/no-books.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class BooksPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  dropHandler(ev) {
    console.log('File(s) dropped');

    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();

    if (ev.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      [...ev.dataTransfer.items].forEach((item, i) => {
        // If dropped items aren't files, reject them
        if (item.kind === 'file' && item.type === 'application/pdf') {
          const book = item.getAsFile();
          let formData = new FormData();
          formData.append('filename', book);
          console.log(formData);
          fetch(`http://localhost:4000/books`, {
            method: 'POST',
            'Content-Type': 'multipart/form-data',
            body: formData,
          })
            .then((res) => res.json())
            .then((data) => console.log(data));
        } else {
          [...ev.dataTransfer.files].forEach((file, i) => {
            console.log(`… file[${i}].name = ${file.name}`);
            console.log(file);
            toast.error('The file needs to be PDF format.', {
              position: 'top-right',
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'dark',
            });
          });
        }
      });
    }
  }

  dragOverHandler(ev) {
    console.log('File(s) in drop zone');

    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
  }

  isBooks() {
    const books = false;
    if (books) {
      return <h1>You have books</h1>;
    } else {
      return (
        <>
          <div
            id="drop_zone"
            onDrop={(e) => this.dropHandler(e)}
            onDragOver={(e) => this.dragOverHandler(e)}
          >
            <img src={img} alt="hello" />
            <div className="books-text">
              <h1>Wanna read a book?</h1>
              <p>
                Import a book or drag the book into the import space so you can
                use features like bookmarking and etc.
              </p>
              <form class="upload">
                <label for="file-upload" class="custom-file-upload">
                  <i class="fa fa-cloud-upload"></i> Custom Upload
                </label>
                <input id="file-upload" type="file" onChange={(e) => {}} />
              </form>
            </div>
          </div>
        </>
      );
    }
  }

  render() {
    return (
      <>
        <ToastContainer />
        <BooksContainer>{this.isBooks()}</BooksContainer>
      </>
    );
  }
}
