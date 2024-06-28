import React from 'react';
import './styles/patrimoines.css';
import data from '../../data/entreprise.json'; // Assurez-vous que le chemin est correct

function Patrimoines() {
    return (
        <div className="patrimoines">
            {data.map(domaine => (
                <div key={domaine.id}>
                    {domaine.sous_domaines.map(sousDomaine => (
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
                                    </tr>
                                </thead>
                                <tbody>
                                    {sousDomaine.entreprises.map(entreprise => (
                                        <tr key={entreprise.nom}>
                                            <td>{entreprise.nom}</td>
                                            <td>{entreprise.ticker}</td>
                                            <td>{entreprise.type}</td>
                                            <td>{entreprise.prix_action}</td>
                                            <td>{entreprise.dividende}</td>
                                            <td>{entreprise.description}</td>
                                            <td>{entreprise.pea ? 'Oui' : 'Non'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Patrimoines;
