import { useState } from "react";
import ConfirmationModal from "../components/ConfirmationModal";


const useConfirmation = () => {
    const [modal, setModal] = useState(null);

    const askConfirmation = (message) => {
        return new Promise((resolve) => {
            const confirmModal = (
                <ConfirmationModal
                    message={message}
                    onConfirm={(result) => {
                        resolve(result); // Résoudre la promesse avec le résultat
                        setModal(null); // Fermer la modale après confirmation
                    }}
                    onCancel={() => {
                        resolve(false); // Résoudre avec false si l'utilisateur annule
                        setModal(null); // Fermer la modale
                    }}
                />
            );
            setModal(confirmModal); // Afficher la modale
        });
    };

    return { modal, askConfirmation };
};

export default useConfirmation;
