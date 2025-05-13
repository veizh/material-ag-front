import React, { createContext, useContext, useState } from 'react';

const SelectContext = createContext();

export const SelectProvider = ({ children }) => {
    const [dialogSelectState, setDialogSelectState] = useState(false);
    const [selectOptions, setSelectOptions] = useState([]);
    const [selectLabelKey, setSelectLabelKey] = useState("label");
    const [onSelectCallback, setOnSelectCallback] = useState(() => () => {});
    const [selectedIndex, setSelectedIndex] = useState(0);

    const showSelect = ({ options, onSelect, labelKey = "label" }) => {
        setSelectOptions(options);
        setOnSelectCallback(() => onSelect);
        setSelectLabelKey(labelKey);
        setSelectedIndex(0);
        window.history.pushState({ modal: true }, ""); // Gère retour tablette
        setDialogSelectState(true);
    };

    const hideSelect = () => {
        setDialogSelectState(false);
    };

    const confirmSelect = (selectedItem) => {
        onSelectCallback(selectedItem);
        hideSelect();
    };

    return (
        <SelectContext.Provider
            value={{
                dialogSelectState,
                selectOptions,
                selectLabelKey,
                selectedIndex,
                setSelectedIndex,
                showSelect,
                hideSelect,
                confirmSelect,
            }}
        >
            {children}
        </SelectContext.Provider>
    );
};

export const useSelect = () => useContext(SelectContext);