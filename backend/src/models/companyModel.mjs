/**
 * @class CompanyModel
 * 
 * Modèle représentant une entreprise avec ses propriétés et méthodes.
 */
class CompanyModel {

    /**
     * Constructeur de la classe CompanyModel.
     * @param {string} id - Identifiant unique de l'entreprise.
     * @param {string} [domaine=""] - Domaine d'activité de l'entreprise.
     * @param {string} [subdomaine=""] - Sous-domaine d'activité de l'entreprise.
     * @param {string} [nom=""] - Nom de l'entreprise.
     * @param {string} [ticker=""] - Symbole boursier de l'entreprise.
     * @param {number} [prix=50] - Prix de l'action de l'entreprise.
     * @param {number} [dividende=5] - Montant du dividende de l'entreprise.
     * @param {string} [description=""] - Description de l'entreprise.
     * @param {boolean} [PEA=false] - Indique si l'entreprise est éligible au PEA.
     * @param {string} [type_investissement=""] - Type d'investissement (e.g., Growth, Value).
     * @param {number} [capitalisation=0] - Capitalisation boursière de l'entreprise.
     * @param {number} [dettes=0] - Montant des dettes de l'entreprise.
     */
    constructor(id, domaine="", subdomaine="", nom="", ticker="", prix=0, dividende=0, description="", PEA=false, type_investissement="", capitalisation=0, dettes=0) {
        this.id = id; // Type: string - Identifiant unique de l'entreprise.
        this.domaine = domaine; // Type: string - Domaine d'activité de l'entreprise.
        this.subdomaine = subdomaine; // Type: string - Sous-domaine d'activité de l'entreprise.
        this.nom = nom; // Type: string - Nom de l'entreprise.
        this.ticker = ticker; // Type: string - Symbole boursier de l'entreprise.
        this.prix = prix; // Type: number - Prix de l'action de l'entreprise.
        this.dividende = dividende; // Type: number - Montant du dividende de l'entreprise.
        this.dividende_yield = (dividende / prix) * 100; // Type: number - Calcul du rendement du dividende en pourcentage.
        this.description = description; // Type: string - Description de l'entreprise.
        this.PEA = PEA; // Type: boolean - Indique si l'entreprise est éligible au Plan d'Épargne en Actions (PEA).
        this.type_investissement = type_investissement; // Type: string - Type d'investissement de l'entreprise.
        this.capitalisation = capitalisation; // Type: number - Capitalisation boursière de l'entreprise.
        this.dettes = dettes; // Type: number - Montant des dettes de l'entreprise.
    }

    /**
     * Méthode statique pour récupérer toutes les entreprises.
     * @param {Array} data - Tableau de données d'entreprises.
     * @returns {Array} - Retourne toutes les entreprises.
     */
    static getAll(data) {
        return data;
    }

    /**
     * Méthode statique pour récupérer une entreprise par son nom.
     * @param {Array} data - Tableau de données d'entreprises.
     * @param {string} name - Nom de l'entreprise à rechercher.
     * @returns {Object | undefined} - Retourne l'entreprise trouvée ou undefined si non trouvée.
     */
    static getByName(data, name) {
        return data.find(company => company.nom === name);
    }

    /**
     * Méthode statique pour récupérer une entreprise par son ID.
     * @param {Array} data - Tableau de données d'entreprises.
     * @param {string} id - ID de l'entreprise à rechercher.
     * @returns {Object | undefined} - Retourne l'entreprise trouvée ou undefined si non trouvée.
     */
    static getById(data, id) {
        return data.find(company => company.id === id);
    }

    /**
     * Méthode pour créer une instance d'entreprise.
     * @returns {Object} - Retourne l'instance d'entreprise créée.
     */
    create() {
        return this;
    }

    /**
     * Méthode pour mettre à jour les données d'une entreprise.
     * @param {Object} data - Nouvelles données de l'entreprise.
     * @returns {Object} - Retourne les données mises à jour de l'entreprise.
     */
    update(data) {
        // Exemple simplifié: mise à jour des données de l'entreprise
        return data;
    }

    /**
     * Méthode pour supprimer une entreprise.
     * @param {Array} data - Tableau de données d'entreprises.
     * @returns {Array} - Retourne le tableau de données d'entreprises après suppression.
     */
    delete(data) {
        // Exemple simplifié: suppression de l'entreprise du tableau de données
        return data.filter(company => company.id !== this.id);
    }
}

// Export de la classe CompanyModel pour pouvoir l'utiliser dans d'autres modules
export default CompanyModel;
