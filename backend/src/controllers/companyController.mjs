import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createHash } from 'crypto'; // Importer la fonction createHash depuis le module crypto
import CompanyModel from '../models/companyModel.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const companiesFilePath = path.resolve(__dirname, '../data/companies.json');

class CompanyController {

    static loadData() {
        try {
            const companiesData = JSON.parse(fs.readFileSync(companiesFilePath, 'utf-8'));
            return companiesData;
        } catch (error) {
            console.error('Error reading JSON file:', error);
            return [];
        }
    }

    /**
     * Méthode statique pour récupérer toutes les entreprises.
     * @returns {Array} - Retourne toutes les entreprises chargées.
     */
    static getAllCompanies() {
        return this.loadData();
    }

    /**
     * Méthode statique pour récupérer une entreprise par son nom.
     * @param {string} name - Nom de l'entreprise à rechercher.
     * @returns {Object | undefined} - Retourne l'entreprise trouvée ou undefined si non trouvée.
     */
    static getCompanyByName(name) {
        const companies = this.loadData();
        return CompanyModel.getByName(companies, name);
    }

    /**
     * Méthode statique pour récupérer une entreprise par son ID.
     * @param {string} id - ID de l'entreprise à rechercher.
     * @returns {Object | undefined} - Retourne l'entreprise trouvée ou undefined si non trouvée.
     */
    static getCompanyById(id) {
        const companies = this.loadData();
        return CompanyModel.getById(companies, id);
    }

    /**
     * Méthode pour créer une nouvelle entreprise.
     * @param {Object} companyData - Données de la nouvelle entreprise.
     * @returns {Object} - Retourne l'instance de l'entreprise créée.
     */
    static createCompany(companyData) {
        let companiesData = this.loadData();
        
        // Générer un nouvel ID unique avec crypto
        let newId;
        const generateUniqueId = () => {
            const id = createHash('sha256')
                .update(companyData.nom + Date.now().toString())
                .digest('hex');
            return id.substr(0, 8); // Utiliser les 8 premiers caractères pour simplifier
        };

        do {
            newId = generateUniqueId();
        } while (companiesData.some(company => company.id === newId));

        // Calculer le rendement du dividende en pourcentage
        const dividendeYield = (companyData.dividende / companyData.prix) * 100;

        // Créer une nouvelle instance de CompanyModel avec les données fournies
        const newCompany = new CompanyModel(
            newId,
            companyData.domaine,
            companyData.subdomaine,
            companyData.nom,
            companyData.ticker,
            companyData.prix,
            companyData.dividende,
            dividendeYield,
            companyData.description,
            companyData.PEA,
            companyData.type_investissement,
            companyData.capitalisation,
            companyData.dettes
        );

        // Ajouter la nouvelle entreprise à la liste
        companiesData.push(newCompany);

        // Sauvegarde des données mises à jour dans le fichier JSON
        try {
            fs.writeFileSync(companiesFilePath, JSON.stringify(companiesData, null, 2));
        } catch (error) {
            console.error('Error saving JSON file:', error);
        }

        return newCompany;
    }

    /**
     * Méthode pour mettre à jour les données d'une entreprise.
     * @param {string} id - ID de l'entreprise à mettre à jour.
     * @param {Object} newData - Nouvelles données de l'entreprise.
     * @returns {Object | undefined} - Retourne les données mises à jour de l'entreprise ou undefined si non trouvée.
     */
    static updateCompany(id, newData) {
        let companiesData = this.loadData();
        const companyToUpdate = CompanyModel.getById(companiesData, id);
        if (companyToUpdate) {
            // Mettre à jour les données de l'entreprise
            Object.assign(companyToUpdate, newData);

            // Mettre à jour la liste des entreprises dans le fichier JSON
            try {
                fs.writeFileSync(companiesFilePath, JSON.stringify(companiesData, null, 2));
            } catch (error) {
                console.error('Error saving JSON file:', error);
            }

            return companyToUpdate;
        }
        return undefined;
    }

    /**
     * Méthode pour supprimer une entreprise.
     * @param {string} id - ID de l'entreprise à supprimer.
     * @returns {Array | undefined} - Retourne le tableau de données d'entreprises après suppression ou undefined si non trouvée.
     */
    static deleteCompany(id) {
        let companiesData = this.loadData();
        const index = companiesData.findIndex(company => company.id === id);
        if (index !== -1) {
            // Supprimer l'entreprise du tableau
            companiesData.splice(index, 1);

            // Mettre à jour la liste des entreprises dans le fichier JSON
            try {
                fs.writeFileSync(companiesFilePath, JSON.stringify(companiesData, null, 2));
            } catch (error) {
                console.error('Error saving JSON file:', error);
            }

            return companiesData;
        }
        return undefined;
    }
}

export default CompanyController;
