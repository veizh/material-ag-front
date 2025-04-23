import { useState } from "react";
import { useNotification } from "../utils/notificationContext";


const AddMaterial = ({ dataInter,list, setSelectedMaterials, selectedMaterials }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedMaterial, setSelectedMaterial] = useState(null);
    const { showNotification,hideNotification } = useNotification();
    const [quantity, setQuantity] = useState("");
    // Filtrer les matériaux selon la recherche
    const filteredList = list?.filter((e) =>
        e.name.toLowerCase().includes(searchTerm.toLowerCase())
    );


    // Ouvrir la modal avec le matériel sélectionné
    const handleMaterialClick = (material) => {
        setSelectedMaterial(material);
        setQuantity(""); // Reset input
    };

    // Ajouter le matériel avec la quantité choisie
    const confirmAddMaterial = () => {
        let item = {
            name: selectedMaterial.name,
            ref: selectedMaterial.ref,
            quantity: quantity
        }
        let tmp = selectedMaterials
        tmp.push(item)
        console.log('====================================');
        console.log(tmp);
        console.log('====================================');
        setSelectedMaterials(tmp);
        setSelectedMaterial(null); // Fermer la modal
    };
    const updateIntervention=()=>{
            console.log('====================================');
            console.log(dataInter._id);
            console.log('====================================');
            console.log('====================================');
            console.log("interdata:",dataInter);
            console.log('====================================');
            let data = dataInter
            selectedMaterials?.map(e=>{
                data.materials.push(e)
            })

            console.log('====================================');
            console.log("product to push",data);
            console.log('====================================');
               fetch("http://localhost:3500/interventions/updateIntervention/"+data._id, {
                   method: "PUT",
                   headers: {
                       "Accept": "*/*",
                       "Content-Type": "application/json"
                   },
                   body:JSON.stringify(data)
               })
                   .then(res => res.json())
                   .then(res => {
                       if (res.status===400 || res.status===500) {
                           showNotification("Il y a un problème")
                           
                       }else{
                        showNotification("ALL GOOD")

                       }
                       
                   });
    }
    return (<div>
           <div className="input__container">
                <input
                    type="text"
                    placeholder="Rechercher un matériel..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        <div className="material-list">
         

            <div className="material-items">
                {filteredList?.length > 0 ? (
                    filteredList.map((e, i) => (
                        <div key={i} className="material-item" onClick={() => handleMaterialClick(e)}>
                            {e.name} <b>{e.quantity && e.quantity !== 0 && "- " + e.quantity + " En stock"}</b>
                        </div>
                    ))
                ) : (
                    <p>Aucun matériel trouvé.</p>
                )}
            </div>

            {/* Modal de sélection de quantité */}
            {selectedMaterial && (
                <div className="modal-quantity">
                    <div className="modal-content">
                        <h3>Ajouter {selectedMaterial.name}</h3>
                        <input
                            type="number"
                            min="1"
                            max={selectedMaterial.stock}
                            placeholder="Quantité"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                        <div className="modal-buttons">
                            <button onClick={() => setSelectedMaterial(null)}>Annuler</button>
                            <button onClick={() => confirmAddMaterial()} disabled={quantity < 0}>
                                Confirmer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
            <button className="btn center" onClick={()=>updateIntervention() }>AJOUTER LE MATERIEL</button>
    </div>
    );
};
export default AddMaterial