import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import BooksPage from './pages/Books';
import HistoryPage from './pages/History';
import React from 'react';
import HomePage from './pages/Home';

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
