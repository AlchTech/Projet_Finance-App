// Import de React
import React from 'react';

// Styles :
import './styles/footer.css';

// Définition du composant fonctionnel
function Footer() {
    return (
        <footer>
            <div className="footer-links">
                <a href="https://www.linkedin.com/in/j%C3%A9r%C3%A9my-saletteswozniak/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href="https://github.com/AlchTech" target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
            <p>© 2024 HarmonyFidelis™ - All rights reserved</p>
        </footer>
    );
}

// Export du composant pour pouvoir l'utiliser ailleurs
export default Footer;
