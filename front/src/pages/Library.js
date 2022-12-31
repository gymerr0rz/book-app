import React, { Component } from 'react';
import { Book, BooksContainer, LoadingGif } from './Library.styled';
import img from '../assets/no-books.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const options = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'dark',
};
export default class BooksPage extends Component {
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
          formData.append('file', book);
          fetch(`http://localhost:4000/uploadBook`, {
            method: 'POST',
            'Content-Type': 'multipart/form-data',
            body: formData,
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              // this.state.books = true;
              // this.createBook(data);
              // console.log(data.data);
            });
        } else {
          this.state.books = false;
          [...ev.dataTransfer.files].forEach((file, i) => {
            console.log(`… file[${i}].name = ${file.name}`);
            console.log(file);
            toast.error('The file needs to be PDF format.', options);
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

  uploadFile(e) {
    e.preventDefault();
    console.log(e.target.files[0]);
    let formData = new FormData();
    formData.append('file', e.target.files[0]);
    fetch('http://localhost:4000/uploadBook', {
      method: 'POST',
      'Content-Type': 'multipart/form-data',
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, typeof data);
        window.href = '/';
      });
  }

  isBooks() {
    function stopLoading() {
      const loading = document.querySelector('.loading');
      loading.classList.remove('active');
    }

    function createCard(title, image, author, cryptedTitle) {
      const main = document.querySelector('.main');
      const books = document.querySelector('.books');
      main.classList.remove('active');
      const root = document.querySelector('.root');
      root.classList.add('active');
      const div = document.createElement('div');
      div.addEventListener('click', (e) => {
        const bookTitle = title.split(' ').join('-');
        window.open('/books/' + bookTitle);
      });
      div.classList.add('card');
      const h1 = document.createElement('h1');
      h1.innerText = title;
      const p = document.createElement('p');
      p.innerText = author;
      const img = document.createElement('img');
      img.src = image;
      div.append(img);
      div.append(h1);
      div.append(p);
      books.append(div);
      stopLoading();
    }

    // Gets book that have been uploaded from back-end
    fetch('http://localhost:4000/getBooks', {
      method: 'GET',
      'Content-Type': 'application/json',
      Accept: '*/*',
    })
      .then((res) => res.json())
      .then((data) => {
        data.forEach((pdf) => {
          const title = pdf.title;
          const thumbnail = pdf.thumbnail;
          const author = pdf.author;
          const cryptedTitle = pdf.crypto;
          createCard(title, thumbnail, author, cryptedTitle);
        });
      });

    return (
      <>
        <div
          id="drop_zone"
          onDrop={(e) => this.dropHandler(e)}
          onDragOver={(e) => this.dragOverHandler(e)}
        >
          <img className="back-image" src={img} alt="hello" />
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
              <input
                id="file-upload"
                type="file"
                name="file"
                onChange={(e) => this.uploadFile(e)}
              />
            </form>
          </div>
        </div>
      </>
    );
  }

  render() {
    return (
      <>
        <ToastContainer />
        <LoadingGif className="loading active">
          <img src="https://i.pinimg.com/originals/a2/dc/96/a2dc9668f2cf170fe3efeb263128b0e7.gif" />
        </LoadingGif>
        <Book className="root">
          <div className="search-div">
            <div className="search-box">
              <input type="text" placeholder="Genre, author, or book name" />
              <i class="fa fa-search"></i>
            </div>
            <form class="upload">
              <label for="file-upload" class="custom-file-upload">
                UPLOAD
              </label>
              <input
                id="file-upload"
                type="file"
                name="file"
                onChange={(e) => this.uploadFile(e)}
              />
            </form>
          </div>
          <div className="books"></div>
        </Book>
        <BooksContainer className="main active">
          {this.isBooks()}
        </BooksContainer>
      </>
    );
  }
}
