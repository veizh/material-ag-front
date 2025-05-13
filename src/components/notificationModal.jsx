import React, { useEffect } from 'react';
import { useNotification } from '../utils/notificationContext.jsx'; // Utilisation du hook du contexte

const NotificationModal = () => {
    const { dialogNotificationState, dialogNotificationContent, btnContent, hideNotification } = useNotification();

    useEffect(() => {
        if (!dialogNotificationState) return; // Pas besoin d'écouter si la modale est fermée

        const handlePopState = (event) => {
            event.preventDefault();
            hideNotification(); // Fermer la modale au lieu de revenir en arrière
        };

        window.addEventListener('popstate', handlePopState);

        // Nettoyer proprement quand la modale se ferme
        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [dialogNotificationState, hideNotification]);

    if (!dialogNotificationState) return null; // Ne rien afficher si l'état est false

    return (
        <div className="background__dialog visible">
            <div className="dialog__notification visible">
                <div className="dialog__content">{dialogNotificationContent}</div>
                <button onClick={hideNotification}>{btnContent}</button>
            </div>
        </div>
    );
};
export default NotificationModal