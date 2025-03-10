import { useState, useEffect } from "react";

const ConfirmationModal = ({ message, onConfirm, onCancel }) => {
    return (
        <div className="modal__overlay">
            <div className="modal">
                <p>{message}</p>
                <div className="modal__buttons">
                    <div className="cancel" onClick={() => onConfirm(false)}>Non ❌ </div>
                    <div className="confirm" onClick={() => onConfirm(true)}>Oui ✅</div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
