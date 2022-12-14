import styled from 'styled-components';

const BooksContainer = styled.div`
  display: none;
  &.active {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 190px;
    text-align: center;
    height: 90vh;
    width: 100vw;
    font-family: 'Overpass';
    background-color: rgba(16, 17, 28, 0.98);
    position: relative;
    overflow: hidden;
    #drop_zone {
      border: 2px dotted #6c63ff;
      padding: 230px 100px;
      z-index: 1;
    }

    h1 {
      color: #fff;
      font-size: 64px;
      font-weight: 800;
    }
    p {
      max-width: 60%;
      color: #fff;
      font-size: 20px;
      padding: 5px 0 30px 0;
      margin: 0 auto;
      font-weight: 300;
    }
    button {
      width: 250px;
      padding: 20px 15px;
      border-radius: 46px;
      border: none;
      text-transform: uppercase;
      background-color: #6c63ff;
      font-family: 'Overpass';
      font-weight: 800;
      font-size: 1rem;
      color: #fff;
      transition: background-color 0.2s ease, transform 0.1s ease;
      cursor: pointer;
    }

    button:hover {
      background-color: #353177;
      transition: background-color 0.2s ease;
    }

    button:active {
      transform: scale(0.98);
      transition: transform 0.1s ease;
    }

    .back-image {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: -99;
      opacity: 20%;
      user-drag: none;
      -webkit-user-drag: none;
      user-select: none;
      -moz-user-select: none;
      -webkit-user-select: none;
      -ms-user-select: none;
    }

    input[type='file'] {
      display: none;
    }
    .custom-file-upload {
      display: inline-block;
      border: none;
      background-color: #6c63ff;
      color: #fff;
      padding: 20px 15px;
      border-radius: 46px;
      width: 250px;
      cursor: pointer;
      font-family: 'Overpass';
      font-weight: 800;
      text-transform: uppercase;
    }

    .book {
      height: 100%;
      width: 100vw;
      overflow: auto;
      /* width */
      ::-webkit-scrollbar {
        width: 25px;
        border-radius: 36px;
        margin: 20px;
      }

      /* Track */
      ::-webkit-scrollbar-track {
        background: #000;
      }

      /* Handle */
      ::-webkit-scrollbar-thumb {
        background: #6c63ff;
        border-radius: 50px;
        transition: background 0.2s ease;
      }

      /* Handle on hover */
      ::-webkit-scrollbar-thumb:hover {
        transition: background 0.2s ease;
        background: #353177;
      }
      h1 {
        font-size: 3rem;
        padding: 20px;
        max-width: 60%;
        margin: 0 auto;
      }

      p {
      }

      .card {
        h1 {
          font-size: 2rem;
        }
        img {
        }
      }
    }
  }
`;

const Book = styled.div`
  display: none;
  &.active {
    display: table;
    height: 100vh;
    width: 100vw;
    background-color: rgba(16, 17, 28, 0.98);

    input[type='file'] {
      display: none;
    }
    .custom-file-upload {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px 20px;
      border: none;
      background-color: #6c63ff;
      color: #fff;
      border-radius: 46px;
      width: 114px;
      height: 39px;
      cursor: pointer;
      font-family: 'Jua';
      font-size: 14px;
      text-transform: uppercase;
    }
    .search-div {
      height: 100px;
      width: 100vw;
      display: flex;
      justify-content: left;
      align-items: center;
      position: relative;
      .search-box input {
        width: 407px;
        height: 55px;
        display: block;
        justify-content: left;
        align-items: center;
        margin: 0 20px 0 100px;
        border: none;
        background-color: #0d0e12;
        border-radius: 46px;
        padding: 0 0 0 20px;
        color: #fff;
        &:focus {
          outline: none;
        }
      }
      .search-box i {
        color: #fff;
        position: absolute;
        left: 460px;
        top: 40px;
      }
    }
    .books {
      display: flex;
      justify-content: left;
      align-items: center;
      width: 100vw;
      height: 437px;
      .card {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 437px;
        width: 281px;
        &:first-child {
          margin-left: 80px;
        }
        margin: 0 21px 0 0;
        img {
          height: 332px;
          width: 226px;
          border-radius: 20px;
        }
        h1 {
          font-size: 20px;
          font-family: 'Overpass';
          color: #fff;
        }
        p {
          font-size: 15px;
          font-family: 'Overpass';
          color: gray;
        }
      }
    }
  }
`;

export { BooksContainer, Book };
