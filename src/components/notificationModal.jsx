import React from 'react';
import { useNotification } from '../utils/notificationContext.jsx'; // Utilisation du hook du contexte

const NotificationModal = () => {
    const { dialogNotificationState, dialogNotificationContent, btnContent, hideNotification } = useNotification();

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