import React, { useEffect, useState } from 'react';
import { useSelect } from '../utils/selectContext';

const SelectModal = () => {
    const {
        dialogSelectState,
        selectOptions,
        selectLabelKey,
        selectedIndex,
        setSelectedIndex,
        hideSelect,
        confirmSelect
    } = useSelect();

    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (!dialogSelectState) return;

        const handlePopState = () => hideSelect();

        window.addEventListener('popstate', handlePopState);
        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [dialogSelectState, hideSelect]);

    if (!dialogSelectState) return null;

    // Filtrage des options selon le champ de recherche
    const filteredOptions = selectOptions.filter(option =>
        option[selectLabelKey].toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="background__dialog visible">
            <div className="dialog__notification visible select">
                <div className="dialog__content select-container">
                    <h3>Veuillez choisir une option</h3>

                    {/* Barre de recherche */}
                    <input
                        type="text"
                        placeholder="Rechercher..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                        style={{ marginBottom: "1rem", width: "100%", padding: "0.5rem" }}
                    />

                    {/* Résultats filtrés */}
                    <div className="list">

                    {filteredOptions.map((option) => {
    const originalIndex = selectOptions.findIndex(
        (o) => o[selectLabelKey] === option[selectLabelKey]
    );

    return (
        <div
            className="listRow"
            onClick={() => {
                confirmSelect(selectOptions[originalIndex]); // 👈 passe l'objet
                hideSelect();
            }}
            key={originalIndex}
        >
            {option[selectLabelKey]}
        </div>
    );
})}
                    </div>

                    {filteredOptions.length === 0 && <p>Aucun résultat</p>}
                </div>
            </div>
        </div>
    );
};

export default SelectModal;