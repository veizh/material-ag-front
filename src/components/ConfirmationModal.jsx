import React, { useEffect } from 'react';

const ConfirmationModal = ({ message, onConfirm, onCancel }) => {

    useEffect(() => {
        const handlePopState = (event) => {
            event.preventDefault();
            if (onCancel) {
                onCancel(); // Appelle ta fonction pour annuler (fermer la modale)
            }
        };

        window.addEventListener('popstate', handlePopState);

        // Nettoyage proprement quand le composant est démonté
        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [onCancel]);

    return (
        <div className="modal__overlay">
            <div className="modal">
                <p>{message}</p>
                <div className="modal__buttons">
                    <div className="cancel" onClick={() => onConfirm(false)}>Non ❌</div>
                    <div className="confirm" onClick={() => onConfirm(true)}>Oui ✅</div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;