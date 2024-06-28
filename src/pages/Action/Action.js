import React, { useState } from 'react';
import './styles/action.css';
import data from '../../data/entreprise.json'; // Assurez-vous que le chemin est correct

function Action() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedAction, setSelectedAction] = useState(null);
    const [entrepriseData, setEntrepriseData] = useState(data); // Utilisez un état local pour stocker les données d'entreprise
    const [newEntreprise, setNewEntreprise] = useState({
        nom: '',
        ticker: '',
        type: '',
        prix_action: '',
        dividende: '',
        description: '',
        pea: false
    });

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setSelectedAction(null); // Réinitialise l'action sélectionnée lorsqu'on change la recherche
    };

    const handleActionClick = (entreprise) => {
        setSelectedAction(entreprise);
    };

    const handleModifyAction = (entrepriseToUpdate) => {
        const newNom = prompt("Entrez le nouveau nom :", entrepriseToUpdate.nom);
        const newTicker = prompt("Entrez le nouveau ticker :", entrepriseToUpdate.ticker);
        const newType = prompt("Entrez le nouveau type :", entrepriseToUpdate.type);
        const newPrixAction = prompt("Entrez le nouveau prix de l'action :", entrepriseToUpdate.prix_action);
        const newDividende = prompt("Entrez le nouveau dividende :", entrepriseToUpdate.dividende);
        const newDescription = prompt("Entrez la nouvelle description :", entrepriseToUpdate.description);
        const newPea = prompt("Est-ce éligible au PEA ? (true/false) :", entrepriseToUpdate.pea);

        if (
            newNom !== null &&
            newTicker !== null &&
            newType !== null &&
            newPrixAction !== null &&
            newDividende !== null &&
            newDescription !== null &&
            newPea !== null
        ) {
            const updatedData = entrepriseData.map(domaine => ({
                ...domaine,
                sous_domaines: domaine.sous_domaines.map(sousDomaine => ({
                    ...sousDomaine,
                    entreprises: sousDomaine.entreprises.map(entreprise => {
                        if (entreprise.nom === entrepriseToUpdate.nom) {
                            return {
                                ...entreprise,
                                nom: newNom,
                                ticker: newTicker,
                                type: newType,
                                prix_action: newPrixAction,
                                dividende: newDividende,
                                description: newDescription,
                                pea: newPea.toLowerCase() === 'true',
                            };
                        }
                        return entreprise;
                    })
                }))
            }));

            setEntrepriseData(updatedData);
            setSelectedAction(null); // Désélectionner l'action après la modification
        }
    };

    const handleDeleteAction = (entrepriseToDelete) => {
        if (window.confirm(`Êtes-vous sûr de vouloir supprimer l'entreprise ${entrepriseToDelete.nom} ?`)) {
            const updatedData = entrepriseData.map(domaine => ({
                ...domaine,
                sous_domaines: domaine.sous_domaines.map(sousDomaine => ({
                    ...sousDomaine,
                    entreprises: sousDomaine.entreprises.filter(entreprise =>
                        entreprise.nom !== entrepriseToDelete.nom
                    )
                }))
            }));

            setEntrepriseData(updatedData);
            setSelectedAction(null); // Désélectionner l'action après la suppression
        }
    };

    const handleAddEntreprise = () => {
        const {
            nom,
            ticker,
            type,
            prix_action,
            dividende,
            description,
            pea
        } = newEntreprise;

        if (
            nom.trim() !== '' &&
            ticker.trim() !== '' &&
            type.trim() !== '' &&
            prix_action.trim() !== '' &&
            dividende.trim() !== '' &&
            description.trim() !== ''
        ) {
            const updatedData = entrepriseData.map(domaine => ({
                ...domaine,
                sous_domaines: domaine.sous_domaines.map(sousDomaine => ({
                    ...sousDomaine,
                    entreprises: [
                        ...sousDomaine.entreprises,
                        {
                            nom: nom.trim(),
                            ticker: ticker.trim(),
                            type: type.trim(),
                            prix_action: prix_action.trim(),
                            dividende: dividende.trim(),
                            description: description.trim(),
                            pea: pea
                        }
                    ]
                }))
            }));

            setEntrepriseData(updatedData);
            setNewEntreprise({
                nom: '',
                ticker: '',
                type: '',
                prix_action: '',
                dividende: '',
                description: '',
                pea: false
            });
        } else {
            alert('Veuillez remplir tous les champs pour ajouter une nouvelle entreprise.');
        }
    };

    // Fonction pour vérifier si un sous-domaine doit être affiché en fonction des actions filtrées
    const shouldDisplaySousDomaine = (sousDomaine) => {
        return sousDomaine.entreprises.some(entreprise =>
            entreprise.nom.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    return (
        <div className="action">
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Rechercher par nom d'entreprise..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>

            {selectedAction && (
                <div className="selected-action">
                    <h3>Entreprise sélectionnée :</h3>
                    <div>
                        <strong>Entreprise : </strong> {selectedAction.nom}
                    </div>
                    <div>
                        <strong>Ticker : </strong> {selectedAction.ticker}
                    </div>
                    <div>
                        <strong>Type : </strong> {selectedAction.type}
                    </div>
                    <div>
                        <strong>Prix Action : </strong> {selectedAction.prix_action}
                    </div>
                    <div>
                        <strong>Dividende : </strong> {selectedAction.dividende}
                    </div>
                    <div>
                        <strong>Description : </strong> {selectedAction.description}
                    </div>
                    <div>
                        <strong>PEA : </strong> {selectedAction.pea ? 'Oui' : 'Non'}
                    </div>
                    <div>
                        <button onClick={() => handleModifyAction(selectedAction)}>Modifier</button>
                        <button onClick={() => handleDeleteAction(selectedAction)}>Supprimer</button>
                    </div>
                </div>
            )}

            <div className="add-action">
                <h3>Ajouter une nouvelle entreprise :</h3>
                <input
                    type="text"
                    placeholder="Nom de l'entreprise"
                    value={newEntreprise.nom}
                    onChange={(e) => setNewEntreprise({ ...newEntreprise, nom: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Ticker"
                    value={newEntreprise.ticker}
                    onChange={(e) => setNewEntreprise({ ...newEntreprise, ticker: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Type"
                    value={newEntreprise.type}
                    onChange={(e) => setNewEntreprise({ ...newEntreprise, type: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Prix de l'action"
                    value={newEntreprise.prix_action}
                    onChange={(e) => setNewEntreprise({ ...newEntreprise, prix_action: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Dividende"
                    value={newEntreprise.dividende}
                    onChange={(e) => setNewEntreprise({ ...newEntreprise, dividende: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={newEntreprise.description}
                    onChange={(e) => setNewEntreprise({ ...newEntreprise, description: e.target.value })}
                />
                <label>
                    PEA :
                    <input
                        type="checkbox"
                        checked={newEntreprise.pea}
                        onChange={(e) => setNewEntreprise({ ...newEntreprise, pea: e.target.checked })}
                    />
                </label>
                <button onClick={handleAddEntreprise}>Ajouter</button>
            </div>

            <div className="action-list">
                {entrepriseData.map(domaine => (
                    <div key={domaine.id}>
                        {domaine.sous_domaines.map(sousDomaine => (
                            shouldDisplaySousDomaine(sousDomaine) && (
                                <div key={sousDomaine.id}>
                                    <h4>{sousDomaine.nom}</h4>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Entreprise</th>
                                                <th>Ticker</th>
                                                <th>Type</th>
                                                <th>Prix Action</th>
                                                <th>Dividende</th>
                                                <th>Description</th>
                                                <th>PEA</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {sousDomaine.entreprises.map(entreprise => (
                                                entreprise.nom.toLowerCase().includes(searchTerm.toLowerCase()) && (
                                                    <tr key={entreprise.nom}>
                                                        <td>{entreprise.nom}</td>
                                                        <td>{entreprise.ticker}</td>
                                                        <td>{entreprise.type}</td>
                                                        <td>{entreprise.prix_action}</td>
                                                        <td>{entreprise.dividende}</td>
                                                        <td>{entreprise.description}</td>
                                                        <td>{entreprise.pea ? 'Oui' : 'Non'}</td>
                                                        <td>
                                                            <button onClick={() => handleActionClick(entreprise)}>Sélectionner</button>
                                                        </td>
                                                    </tr>
                                                )
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Action;
