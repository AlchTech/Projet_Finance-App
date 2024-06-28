import logo from './assets/icons/logo.svg';
import './styles/App.css';
import React from 'react';
// Pages :
import Accueil from './pages/Accueil/Accueil.js';

// Routes :
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Composants :
import Navigation from './components/Navigation/Navigation.js';
import Footer from './components/Footer/Footer.js';

function App() {
  return (
    <div className="App">
      <header>
          <Router>
          <Navigation /> {/* Composant de navigation */}
          <Routes>
            <Route path="/" element={<Accueil />} />
          </Routes>
        </Router>
      </header>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
