```
src/
├── assets/                 // Ressources statiques comme images, icônes, etc.
├── components/             // Composants réutilisables
│   ├── Button/
│   ├── Input/
│   ├── ...
│   └── index.js            // Export des composants réutilisables
├── pages/                  // Pages de l'application
│   ├── Home/
│   │   ├── Home.js         // Composant principal de la page d'accueil
│   │   ├── components/     // Composants spécifiques à la page d'accueil
│   │   ├── styles/         // Styles spécifiques à la page d'accueil
│   │   └── index.js        // Export du composant principal de la page d'accueil
│   ├── About/
│   │   ├── About.js        // Composant principal de la page À propos
│   │   ├── components/     // Composants spécifiques à la page À propos
│   │   ├── styles/         // Styles spécifiques à la page À propos
│   │   └── index.js        // Export du composant principal de la page À propos
│   └── ...
├── services/               // Services (API, gestion des données)
│   ├── api.js              // Gestion des appels API
│   ├── data.js             // Gestion de l'état global (contexte, Redux)
│   └── ...
├── utils/                  // Utilitaires réutilisables
│   ├── helpers.js          // Fonctions d'aide génériques
│   └── constants.js        // Constantes utilisées à travers l'application
├── styles/                 // Styles globaux ou thématisés
│   ├── main.css            // Fichier principal de styles
│   └── ...
├── App.js                  // Composant principal de l'application
│── index.js                // Point d'entrée du rendu dans le DOM
│── reportWebVitals.js
└── setupTests.js
```