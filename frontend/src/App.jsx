import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Home from './pages/Home';
import Login from './pages/Login';
import NotesPage from './pages/NotesPage';
import NotesViewPage from './pages/NotesViewPage';
import TestsPage from './pages/TestsPage';
import TestViewPage from './pages/TestViewPage';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#121212]">
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/notes/view/:noteId" element={<NotesViewPage />} />
          <Route path="/tests" element={<TestsPage />} />
          <Route path="/tests/view/:testId" element={<TestViewPage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
        <Footer />
        <ScrollToTop />
      </div>
    </Router>
  );
}

export default App;
