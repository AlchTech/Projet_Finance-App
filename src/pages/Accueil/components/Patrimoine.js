// Import de React
import React from 'react';
// Composants :

// Assets :

// Styles :

// Data :
import entreprise from '../../../data/entreprise.json';

function Patrimoine() {

    // Recupere les données dans data/entreprise.json
    try {
        console.log(entreprise);
    } catch (error) {
        console.error(error);
    }

    return (
        <div className="patrimoine">
            <h2>Patrimoine</h2>
            <pre>
                Vous pouvez visualiser les actions que vous avez rentrées dans l'application, les comparer modifiez les informations, ou les supprimer.
            </pre>
        </div>
    );
}

// Export du composant pour pouvoir l'utiliser ailleurs
export default Patrimoine;