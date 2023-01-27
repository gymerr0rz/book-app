import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import BooksPage from './pages/Library';
import HistoryPage from './pages/History';
import React from 'react';
import HomePage from './pages/Home';
import { BooksDisplay } from './pages/BooksDisplay';

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/library" element={<BooksPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/books/:id" element={<BooksDisplay />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
