import React, { useState, useEffect } from 'react';
import { saveAs } from 'file-saver';
import './styles/action.css';
import initialData from '../../data/entreprise.json'; // Assurez-vous que le chemin est correct

function Action() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedAction, setSelectedAction] = useState(null);
    const [entrepriseData, setEntrepriseData] = useState(initialData);
    const [newDomaine, setNewDomaine] = useState('');
    const [newSousDomaine, setNewSousDomaine] = useState({ nom: '', domaineId: '' });
    const [newEntreprise, setNewEntreprise] = useState({
        nom: '',
        ticker: '',
        type: '',
        prix_action: '',
        dividende: '',
        description: '',
        pea: false,
        sousDomaineId: ''
    });

    useEffect(() => {
        // Lire les données du fichier JSON local s'il existe
        const savedData = localStorage.getItem('entrepriseData');
        if (savedData) {
            setEntrepriseData(JSON.parse(savedData));
        }
    }, []);

    const saveDataToFile = (data) => {
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        saveAs(blob, 'entreprise.json');
        localStorage.setItem('entrepriseData', JSON.stringify(data));
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setSelectedAction(null);
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
            setSelectedAction(null);
            saveDataToFile(updatedData);
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
            setSelectedAction(null);
            saveDataToFile(updatedData);
        }
    };

    const handleAddDomaine = () => {
        if (newDomaine.trim() !== '') {
            const updatedData = [
                ...entrepriseData,
                {
                    id: (entrepriseData.length + 1).toString(),
                    nom: newDomaine.trim(),
                    sous_domaines: []
                }
            ];
            setEntrepriseData(updatedData);
            setNewDomaine('');
            saveDataToFile(updatedData);
        } else {
            alert('Veuillez entrer un nom de domaine valide.');
        }
    };

    const handleAddSousDomaine = () => {
        const { nom, domaineId } = newSousDomaine;
        if (nom.trim() !== '' && domaineId.trim() !== '') {
            const updatedData = entrepriseData.map(domaine => {
                if (domaine.id === domaineId) {
                    return {
                        ...domaine,
                        sous_domaines: [
                            ...domaine.sous_domaines,
                            {
                                id: (domaine.sous_domaines.length + 1).toString(),
                                nom: nom.trim(),
                                entreprises: []
                            }
                        ]
                    };
                }
                return domaine;
            });
            setEntrepriseData(updatedData);
            setNewSousDomaine({ nom: '', domaineId: '' });
            saveDataToFile(updatedData);
        } else {
            alert('Veuillez entrer un nom de sous-domaine et sélectionner un domaine.');
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
            pea,
            sousDomaineId
        } = newEntreprise;

        if (
            nom.trim() !== '' &&
            ticker.trim() !== '' &&
            type.trim() !== '' &&
            prix_action.trim() !== '' &&
            dividende.trim() !== '' &&
            description.trim() !== '' &&
            sousDomaineId.trim() !== ''
        ) {
            const updatedData = entrepriseData.map(domaine => ({
                ...domaine,
                sous_domaines: domaine.sous_domaines.map(sousDomaine => {
                    if (sousDomaine.id === sousDomaineId) {
                        return {
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
                        };
                    }
                    return sousDomaine;
                })
            }));

            setEntrepriseData(updatedData);
            setNewEntreprise({
                nom: '',
                ticker: '',
                type: '',
                prix_action: '',
                dividende: '',
                description: '',
                pea: false,
                sousDomaineId: ''
            });
            saveDataToFile(updatedData);
        } else {
            alert('Veuillez remplir tous les champs pour ajouter une nouvelle entreprise.');
        }
    };

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
                <h3>Ajouter un nouveau domaine :</h3>
                <input
                    type="text"
                    placeholder="Nom du domaine"
                    value={newDomaine}
                    onChange={(e) => setNewDomaine(e.target.value)}
                />
                <button onClick={handleAddDomaine}>Ajouter Domaine</button>
            </div>

            <div className="add-action">
                <h3>Ajouter un nouveau sous-domaine :</h3>
                <select
                    value={newSousDomaine.domaineId}
                    onChange={(e) => setNewSousDomaine({ ...newSousDomaine, domaineId: e.target.value })}
                >
                    <option value="">Sélectionnez un domaine</option>
                    {entrepriseData.map(domaine => (
                        <option key={domaine.id} value={domaine.id}>{domaine.nom}</option>
                    ))}
                </select>
                <input
                    type="text"
                    placeholder="Nom du sous-domaine"
                    value={newSousDomaine.nom}
                    onChange={(e) => setNewSousDomaine({ ...newSousDomaine, nom: e.target.value })}
                />
                <button onClick={handleAddSousDomaine}>Ajouter Sous-Domaine</button>
            </div>

            <div className="add-action">
                <h3>Ajouter une nouvelle entreprise :</h3>
                <select
                    value={newEntreprise.sousDomaineId}
                    onChange={(e) => setNewEntreprise({ ...newEntreprise, sousDomaineId: e.target.value })}
                >
                    <option value="">Sélectionnez un sous-domaine</option>
                    {entrepriseData.flatMap(domaine =>
                        domaine.sous_domaines.map(sousDomaine => (
                            <option key={sousDomaine.id} value={sousDomaine.id}>
                                {domaine.nom} - {sousDomaine.nom}
                            </option>
                        ))
                    )}
                </select>
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
                    placeholder="Prix Action"
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
                    <input
                        type="checkbox"
                        checked={newEntreprise.pea}
                        onChange={(e) => setNewEntreprise({ ...newEntreprise, pea: e.target.checked })}
                    />
                    PEA
                </label>
                <button onClick={handleAddEntreprise}>Ajouter Entreprise</button>
            </div>

            <div className="entreprise-list">
                {entrepriseData.map(domaine => (
                    <div key={domaine.id}>
                        <h3>{domaine.nom}</h3>
                        {domaine.sous_domaines.filter(shouldDisplaySousDomaine).map(sousDomaine => (
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
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sousDomaine.entreprises.filter(entreprise =>
                                            entreprise.nom.toLowerCase().includes(searchTerm.toLowerCase())
                                        ).map(entreprise => (
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
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Action;
