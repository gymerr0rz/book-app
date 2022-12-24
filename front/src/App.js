import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import BooksPage from './pages/Books';
import HistoryPage from './pages/History';
import React from 'react';
import HomePage from './pages/Home';
import { LoginPage } from './pages/Login';
import { RegisterPage } from './pages/Register';
import { BooksDisplay } from './pages/BooksDisplay';

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
