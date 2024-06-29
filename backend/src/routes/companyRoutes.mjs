import express from 'express';
import CompanyController from '../controllers/companyController.mjs';

const router = express.Router();

// Route pour récupérer toutes les entreprises
router.get('/companies', (req, res) => {
    try {
        const companies = CompanyController.loadData();
        res.json(companies);
    } catch (error) {
        console.error('Erreur lors de la récupération des entreprises :', error);
        res.status(500).json({ message: 'Erreur lors de la récupération des entreprises.' });
    }
});

// Route pour récupérer une entreprise par son ID
router.get('/companies/:id', (req, res) => {
    const companyId = req.params.id;
    try {
        const company = CompanyController.getById(companyId);
        if (!company) {
            return res.status(404).json({ message: 'Entreprise non trouvée.' });
        }
        res.json(company);
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'entreprise :', error);
        res.status(500).json({ message: 'Erreur lors de la récupération de l\'entreprise.' });
    }
});

// Route pour créer une nouvelle entreprise
router.post('/companies', (req, res) => {
    const companyData = req.body;
    try {
        const newCompany = CompanyController.createCompany(companyData);
        if (!newCompany) {
            return res.status(400).json({ message: 'Erreur lors de la création de l\'entreprise.' });
        }
        res.status(201).json(newCompany);
    } catch (error) {
        console.error('Erreur lors de la création de l\'entreprise :', error);
        res.status(500).json({ message: 'Erreur lors de la création de l\'entreprise.' });
    }
});

// Route pour mettre à jour une entreprise existante
router.put('/companies/:id', (req, res) => {
    const companyId = req.params.id;
    const updatedData = req.body;
    try {
        const updatedCompany = CompanyController.updateCompany(companyId, updatedData);
        if (!updatedCompany) {
            return res.status(404).json({ message: 'Entreprise non trouvée ou erreur lors de la mise à jour.' });
        }
        res.json(updatedCompany);
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'entreprise :', error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'entreprise.' });
    }
});

// Route pour supprimer une entreprise
router.delete('/companies/:id', (req, res) => {
    const companyId = req.params.id;
    try {
        const success = CompanyController.deleteCompany(companyId);
        if (!success) {
            return res.status(404).json({ message: 'Entreprise non trouvée ou erreur lors de la suppression.' });
        }
        res.json({ message: 'Entreprise supprimée avec succès.' });
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'entreprise :', error);
        res.status(500).json({ message: 'Erreur lors de la suppression de l\'entreprise.' });
    }
});

export default router;
    