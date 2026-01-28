import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home'
import NavigationBar from './components/NavigationBar'
import Contact from './pages/Contact';
import Login from './pages/Login';
import NotesPage from './pages/NotesPage';
import NotesViewPage from './pages/NotesViewPage';
import Footer from './components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path="/notes" element={<NotesPage />} />
        <Route path="/notes/view/:noteId" element={<NotesViewPage />} />
        <Route path='/contact-us' element={<Contact />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
