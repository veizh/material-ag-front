import React, { useEffect, useState } from 'react';

const SelectObjectModal = ({ options = [], onSelect, onCancel, displayKey = 'label' }) => {
    const [selectedIndex, setSelectedIndex] = useState(0); // index du choix sélectionné

    useEffect(() => {
        window.history.pushState({ modal: true }, "");

        const handlePopState = () => {
            if (onCancel) onCancel();
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [onCancel]);

    const handleConfirm = () => {
        onSelect(options[selectedIndex]); // on renvoie l'objet complet
    };

    return (
        <div className="modal__overlay">
            <div className="modal overlay-select">
                <h2>Sélectionner une option</h2>

                <select
                    value={selectedIndex}
                    onChange={(e) => setSelectedIndex(Number(e.target.value))}
                >
                    {options.map((option, index) => (
                        <option key={index} value={index}>
                            {option[displayKey]}
                        </option>
                    ))}
                </select>

                <div className="modal__buttons">
                    <button className="cancel" onClick={onCancel}>Annuler</button>
                    <button className="confirm" onClick={handleConfirm}>Valider</button>
                </div>
            </div>
        </div>
    );
};

export default SelectObjectModal;
