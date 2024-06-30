import logo from './logo.svg';
import './App.css';
import api from './services/api';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    api.get('/')
      .then(response => {
        console.log(response.data);
        // Utilisez les données récupérées ici
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données:', error);
      });
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
