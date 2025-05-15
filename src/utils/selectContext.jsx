import React, { createContext, useContext, useState } from 'react';

const SelectContext = createContext();

export const SelectProvider = ({ children }) => {
    const [dialogSelectState, setDialogSelectState] = useState(false);
    const [selectOptions, setSelectOptions] = useState([]);
    const [excludedOptions, setExcludedOptions] = useState([]);
    const [selectLabelKey, setSelectLabelKey] = useState("label");
    const [onSelectCallback, setOnSelectCallback] = useState(() => () => {});
    const [selectedIndex, setSelectedIndex] = useState(0);

 const showSelect = ({ options, onSelect, labelKey = "label", excluded = [] }) => {
    setSelectOptions(options);
    setSelectLabelKey(labelKey);
    setExcludedOptions(excluded); // ✅ CORRIGÉ ICI
    setDialogSelectState(true);
    window.history.pushState({ modal: true }, "");
    setOnSelectCallback(() => onSelect);
    setSelectedIndex(0);
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
                excludedOptions, // ✅ ajoute ici
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
