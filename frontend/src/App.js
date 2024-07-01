import './styles/App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Accueil from './pages/Accueil/Accueil';
import Navigation from './components/Navigation/Navigation'; // Assuming you'll use it
import Action from './pages/Action/Action';

function App() {
  
  return (
    <div className="App">
      <Router>
        <Navigation /> {/* Using Navigation component */}
        <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/action" element={<Action />} />
            {/* Add other routes here */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
