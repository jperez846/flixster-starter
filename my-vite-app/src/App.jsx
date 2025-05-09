import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import NowPlaying from './NowPlaying';
import SearchMovies from './SearchMovies';
import About from './About';
import Contact from './Contact';
import Footer from './Footer';
import './App.css';

const App = () => {
  return (
    <Router>
      <header className="banner">
        <h1>🎬 Flixter</h1>
      </header>

      <nav className="nav-pane"> 
        <ul className="nav-pane-ul">
          <li><Link to="/NowPlaying">Now Playing</Link></li>
          <li><Link to="/SearchMovies">Search Movies</Link></li>
          <li><Link to="/About">About</Link></li>
          <li><Link to="/Contact">Contact</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<NowPlaying />} />
        <Route path="/NowPlaying" element={<NowPlaying />} />
        <Route path="/SearchMovies" element={<SearchMovies />} />
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
      </Routes>

      <Footer />
    </Router>
  );
};

export default App;