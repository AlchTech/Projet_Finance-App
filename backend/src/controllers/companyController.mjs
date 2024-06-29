import fs from 'fs';
import path from 'path';
import * as data from '../data/companies.json' assert { type: 'json' };
import CompanyModel from '../models/companyModel.mjs';

class CompanyController {
    static loadData() {
        let companies = [];
        data.default.forEach(company => {
            companies.push(new CompanyModel(company.id, company.domaine, company.subdomaine, company.nom, company.ticker, company.prix, company.dividende, company.description, company.PEA, company.type_investissement, company.capitalisation, company.dettes));
        });
        return companies;
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
        const newCompany = new CompanyModel(companyData.id, companyData.domaine, companyData.subdomaine, companyData.nom, companyData.ticker, companyData.prix, companyData.dividende, companyData.description, companyData.PEA, companyData.type_investissement, companyData.capitalisation, companyData.dettes);
        return newCompany.create();
    }

    /**
     * Méthode pour mettre à jour les données d'une entreprise.
     * @param {string} id - ID de l'entreprise à mettre à jour.
     * @param {Object} newData - Nouvelles données de l'entreprise.
     * @returns {Object | undefined} - Retourne les données mises à jour de l'entreprise ou undefined si non trouvée.
     */
    static updateCompany(id, newData) {
        let companies = this.loadData();
        const companyToUpdate = CompanyModel.getById(companies, id);
        if (companyToUpdate) {
            const updatedCompany = { ...companyToUpdate, ...newData };
            companies = companies.map(company => (company.id === id ? updatedCompany : company));
            return updatedCompany;
        }
        return undefined;
    }

    /**
     * Méthode pour supprimer une entreprise.
     * @param {string} id - ID de l'entreprise à supprimer.
     * @returns {Array | undefined} - Retourne le tableau de données d'entreprises après suppression ou undefined si non trouvée.
     */
    static deleteCompany(id) {
        let companies = this.loadData();
        const companyToDelete = CompanyModel.getById(companies, id);
        if (companyToDelete) {
            companies = companies.filter(company => company.id !== id);
            return companies;
        }
        return undefined;
    }
}

export default CompanyController;
