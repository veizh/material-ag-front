// NotificationContext.js
import React, { createContext, useContext, useState } from 'react';

// Créer un contexte pour la notification
const NotificationContext = createContext();

// Fournisseur du contexte
export const NotificationProvider = ({ children }) => {
    const [dialogNotificationState, setDialogNotificationState] = useState(false);
    const [dialogNotificationContent, setDialogNotificationContent] = useState("");
    const [btnContent, setBtnContent] = useState("OK");

    const showNotification = (content, buttonText = "OK") => {
        setDialogNotificationContent(content);
        setBtnContent(buttonText);
        setDialogNotificationState(true);
    };

    const hideNotification = () => {
        setDialogNotificationState(false);
    };

    return (
        <NotificationContext.Provider value={{ dialogNotificationState, dialogNotificationContent, btnContent, showNotification, hideNotification }}>
            {children}
        </NotificationContext.Provider>
    );
};

// Hook pour utiliser le contexte
export const useNotification = () => useContext(NotificationContext);