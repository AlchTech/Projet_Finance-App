import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url'; // Importez fileURLToPath pour convertir l'URL en chemin de fichier

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import companyRoutes from './src/routes/companyRoutes.mjs';

const app = express();

// Middleware pour parser le JSON des corps de requête
app.use(express.json());

// Middleware pour servir les fichiers statiques (si nécessaire)
app.use(express.static(path.join(__dirname, 'public')));

// Utilisation des routes pour les entreprises
app.use('/api', companyRoutes);

// Route de base
app.get('/', (req, res) => {
    res.send('Bienvenue sur l\'API des entreprises');
});

// Gestion des erreurs 404 pour les routes non trouvées
app.use((req, res) => {
    res.status(404).send('Page non trouvée');
});

// Gestion des erreurs globales
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Erreur interne du serveur');
});

// Port d'écoute pour le serveur
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Serveur démarré sur le port "http://localhost:${port}"`);
});