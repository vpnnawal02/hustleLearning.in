import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavigationBar';
import Home from './pages/Home';
import Login from './pages/Login';
import NotesPage from './pages/NotesPage';
import NotesViewPage from './pages/NotesViewPage';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Router>
        <div className="min-h-screen bg-[#121212]">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/notes" element={<NotesPage />} />
            <Route path="/notes/view/:noteId" element={<NotesViewPage />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;
