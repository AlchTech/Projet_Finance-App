import React, { useState, useEffect } from 'react';
import './styles/action.css';
import api from '../../services/api';

function Action() {
    const [searchTerm, setSearchTerm] = useState('');
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        id: '',
        domaine: '',
        subdomaine: '',
        nom: '',
        ticker: '',
        prix: 0,
        dividende: 0,
        dividende_yield: 0,
        description: '',
        PEA: false,
        type_investissement: 'dividende',
        capitalisation: 0,
        dettes: 0
    });

    // Charger les données depuis l'API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/');
                setData(response.data);
                setFilteredData(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des données:', error);
            }
        };

        fetchData();
    }, []);

    // Filtrer les données en fonction de la recherche
    useEffect(() => {
        const filtered = data.filter(item =>
            item.nom.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredData(filtered);
    }, [searchTerm, data]);

    // Gérer la soumission du formulaire pour création ou mise à jour
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (editMode) {
                await api.put(`/${formData.id}`, formData);
                const updatedData = data.map(item =>
                    item.id === formData.id ? formData : item
                );
                setData(updatedData);
                setFilteredData(updatedData);
            } else {
                const response = await api.post('/', formData);
                setData([...data, response.data]);
                setFilteredData([...data, response.data]);
            }
            setEditMode(false);
            setFormData({
                id: '',
                domaine: '',
                subdomaine: '',
                nom: '',
                ticker: '',
                prix: 0,
                dividende: 0,
                dividende_yield: 0,
                description: '',
                PEA: false,
                type_investissement: 'dividende',
                capitalisation: 0,
                dettes: 0
            });
        } catch (error) {
            console.error('Erreur lors de la soumission du formulaire:', error);
        }
    };

    // Supprimer une entrée existante
    const handleDelete = async (itemId) => {
        try {
            await api.delete(`/${itemId}`);
            const updatedData = data.filter(item => item.id !== itemId);
            setData(updatedData);
            setFilteredData(updatedData);
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'élément:', error);
        }
    };

    // Mettre à jour le formulaire avec les données sélectionnées pour modification
    const handleEdit = (item) => {
        setEditMode(true);
        setFormData(item);
    };


    return (

        <div className="action">

        </div>
    );
}

export default Action;
