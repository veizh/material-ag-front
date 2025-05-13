import { useState } from "react";
import { useSelect } from "../utils/selectContext";
import { useNotification } from "../utils/notificationContext";
import {Cog} from "lucide-react"
const MaterialSelector = ({ initialMaterials = [], showSiteSelector = false, siteOptions = [], onSiteSelected, onConfirm }) => {
    const [materialsSelected, setMaterialsSelected] = useState([]);
    const [selectedSite, setSelectedSite] = useState(null);
    const { showSelect } = useSelect();
    const { showNotification } = useNotification();

    const openMaterialSelector = () => {
        showSelect({
            options: initialMaterials,
            labelKey: "name",
            onSelect: (mat) => {
                setMaterialsSelected(prev => [...prev, ...(Array.isArray(mat) ? mat : [mat])]);
            }
        });
    };

    const openSiteSelector = () => {
        showSelect({
            options: siteOptions,
            labelKey: "placeholder",
            onSelect: (site) => {
                setSelectedSite(site);
                onSiteSelected && onSiteSelected(site);
            }
        });
    };

    const toggleBroken = (index) => {
        const newList = [...materialsSelected];
        newList[index].broken = !newList[index].broken;
        setMaterialsSelected(newList);
        onConfirm(newList, selectedSite);
    };

    const updateQuantity = (index, value) => {
        const newList = [...materialsSelected];
        newList[index].quantity = Number(value);
        setMaterialsSelected(newList);
        onConfirm(newList, selectedSite);
    };

    const removeMaterial = (index) => {
        const newList = materialsSelected.filter((_, i) => i !== index);
        setMaterialsSelected(newList);
        onConfirm(newList, selectedSite);
    };

    return (
        <div>
            {showSiteSelector && (
                <div className="selectBtn" onClick={openSiteSelector}>
                    {selectedSite ? `${selectedSite.clientName} - ${selectedSite.location}` : "Sélectionnez un site"}
                </div>
            )}
            <div className="selectBtn" onClick={openMaterialSelector}>Sélectionnez le matériel qui revient au dépôt</div>
            {materialsSelected.map((e, i) => (
                <div key={i} className="material__row" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <p>{e.name}</p>

                    {/* SVG simulant une checkbox */}
                    <div onClick={() => toggleBroken(i)} style={{ cursor: "pointer",display:"flex",alignItems:"center" }}>
                        <Cog size={42} stroke={e.broken?"red":"black"} /> 
                    </div>

                    <input
                        type="number"
                        value={e.quantity || 0}
                        onChange={(event) => updateQuantity(i, event.target.value)}
                        style={{ width: "100px", textAlign: "center" }}
                    />

                    <div onClick={() => removeMaterial(i)} style={{ cursor: "pointer" }}>❌</div>
                </div>
            ))}
        </div>
    );
};

export default MaterialSelector;
