import React from 'react';
import { HomeContainer, HomeText } from './Home.styled';
import BookVector from '../assets/book-lover.svg';
import { Link } from 'react-router-dom';
const text = '/laibə(ɹ)';

const Home = () => {
  return (
    <>
      <HomeContainer>
        <HomeText>
          <h1>Welcome to LIBER</h1>
          <p>{text}</p>
          <p className="main-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nulla
            sem, lobortis eu laoreet vitae, commodo eget ligula. Morbi quis
            nulla nisi. Quisque elementum magna nec tincidunt maximus.
            Suspendisse aliquam et arcu vitae laoreet. Curabitur gravida
            venenatis tellus, non eleifend lectus bibendum eleifend. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit. Cras efficitur tempor
            leo varius dapibus.
            <br />
            <br /> Mauris semper, lorem ac aliquam vulputate, felis tellus
            rhoncus leo, sed ullamcorper magna orci non ipsum. Nullam eget
            iaculis mi, vel vulputate ligula. Morbi elementum in lorem ut
            efficitur. Curabitur egestas, nulla eu dictum cursus, erat massa
            egestas nisl, sit amet ultrices urna justo mattis tortor. Curabitur
            ipsum purus, tincidunt nec dolor ut, lacinia efficitur mauris.
            <br />
            <br />
            Quisque eget justo ipsum. Nulla et enim leo. Sed aliquam, augue id
            viverra luctus, est sapien sagittis mauris, et commodo magna arcu
            non neque. Etiam turpis velit, auctor a dictum et, pretium ut ex.
            Aliquam commodo quis nulla auctor blandit. Aenean sed interdum
            tortor, sit amet lobortis est. Curabitur nec bibendum nunc.
            Suspendisse potenti. In a posuere neque. Cras eu odio erat. Integer
            sed lectus ligula. Nulla faucibus elementum magna. Fusce accumsan
            sagittis arcu, et efficitur eros placerat ut.
          </p>
          <Link to="/library">
            <button>Start Reading</button>
          </Link>
        </HomeText>
        <img src={BookVector} alt="picture-book" />
      </HomeContainer>
    </>
  );
};

export default Home;
