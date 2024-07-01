// Import de React
import React from 'react';
// Composants :

// Assets :

// Styles :
import './styles/accueil.css';

// Définition du composant fonctionnel
const Accueil = () => {
    return (
        <div className="accueil">
            <h2>Qu'est-ce que Finance App ?</h2>
            <p>
                Finance App est une application web qui permet de faire des choix d'achat d'action en fonction de plusieurs facteur.
                L'application permet de visualiser les actions en bourse, de les comparer et de les acheter en fonction de plusieurs critères.
            </p>
            <h3>Comment ça marche ?</h3>
            <p>
                Finance App vous permet d'ajouter des actions à votre application, prix, dividendes, croissance ou dividendes, etc.
                Vous pouvez ensuite comparer ces actions entre elles et les acheter en fonction de vos critères.
            </p>
            <p>Patrimoine : Vous pouvez visualiser les actions que vous avez rentrées dans l'application, les comparer modifiez les informations, ou les supprimer.</p>
            <p>Action : Vous pouvez ajouter des actions à votre application.</p>
            <h3>Qui sommes-nous ?</h3>
            <p>
                Finance App est une application développée par HarmonyFidelis™, qui est l'entité numérique de Jérémy Salettes-Wozniak.
            </p>
            <h3>Protection des données</h3>
            <p>
                Finance App ne collecte pas de données personnelles. Les données que vous entrez dans l'application sont stockées dans votre navigateur et sur votre ordinateur.
            </p>
        </div>
    );
}

// Export du composant pour pouvoir l'utiliser ailleurs
export default Accueil;
