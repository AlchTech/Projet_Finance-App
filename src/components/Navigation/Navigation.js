// Import de React
import React from 'react';
// Composants :

// Assets :
import logo from '../../assets/images/logo.png';

// Styles :
import './styles/navigation.css';

// Import de Link pour naviguer entre les pages
import { Link } from 'react-router-dom';


// Composant Accueil
function Accueil() {
    return (
        <section className="Accueil">
            <div className="header">
                <div className="logo">
                    <img src={logo} alt="Logo de l'application" /> 
                </div>
                <h1>HarmonyFidelis | Finance App</h1>
                <div></div>
            </div>
            <div className="nav">
                <nav>
                    <ul>
                        <li><Link to="/">Accueil</Link></li>
                        <li><Link to="/patrimoine">Patrimoine</Link></li>
                        <li><Link to="/action">Action</Link></li>
                        <li><Link to="/stats">Statistiques</Link></li>
                    </ul>
                </nav>
            </div>
        </section>

    );
}

// Export du composant pour pouvoir l'utiliser ailleurs
export default Accueil;
