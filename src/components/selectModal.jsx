import React, { useEffect, useState } from 'react';
import { useSelect } from '../utils/selectContext';

const SelectModal = () => {
    let [currentOption,setCurrentOptions]=useState()
    const {
        dialogSelectState,
        selectOptions,
        selectLabelKey,
        excludedOptions ,
        hideSelect,
        confirmSelect
    } = useSelect();

    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (!dialogSelectState) return;
        console.log(selectOptions);
        console.log(excludedOptions);
        
        const handlePopState = () => hideSelect();

        window.addEventListener('popstate', handlePopState);
        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [dialogSelectState, hideSelect]);

    if (!dialogSelectState) return null;

    // Filtrage selon la recherche et exclusion
    const filteredOptions = selectOptions
        .filter(option =>
            option[selectLabelKey].toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter(option =>
            !excludedOptions.some(ex => ex.ref === option.ref)
        );

    return (
        <div className="background__dialog visible">
            <div className="dialog__notification visible select">
                <div className="dialog__content select-container">
                    <h3>Veuillez choisir une option</h3>

                    <input
                        type="text"
                        placeholder="Rechercher..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                        style={{ marginBottom: "1rem", width: "100%", padding: "0.5rem" }}
                    />

                    {/* Liste des options */}
                    <div className="list">
                        {filteredOptions.map((option) => {
                            const originalIndex = selectOptions.findIndex(
                                (o) => o[selectLabelKey] === option[selectLabelKey]
                            );

                            return (
                                <div
                                    className="listRow"
                                    onClick={() => {
                                        confirmSelect(selectOptions[originalIndex]);
                                        hideSelect();
                                    }}
                                    key={option._id || originalIndex}
                                >
                                    {option[selectLabelKey]}
                                </div>
                            );
                        })}
                    </div>

                    {filteredOptions.length === 0 && <p>Aucun résultat</p>}
                </div>
                  <button
                        onClick={hideSelect}
                        style={{
                            marginBottom: "1rem",
                            padding: "0.5rem 1rem",
                            backgroundColor: "#ccc",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer"
                        }}
                    >
                        Retour
                    </button>
            </div>
        </div>
    );
};

export default SelectModal;