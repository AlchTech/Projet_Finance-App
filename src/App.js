import logo from './assets/icons/logo.svg';
import './styles/App.css';
import React from 'react';
// Pages :
import Accueil from './pages/Accueil/Accueil.js';
import Patrimoines from './pages/Patrimoine/Patrimoines.js';
import Action from './pages/Action/Action.js';
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
            <Route path="/patrimoines" element={<Patrimoines />} />
            <Route path="/action" element={<Action />} />
          </Routes>
        </Router>
      </header>
      <Footer /> {/* Composant de pied de page */}
    </div>
  );
}

export default App;
