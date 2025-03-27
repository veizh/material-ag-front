import { useEffect, useRef, useState } from "react";
import InputComp from "../components/inputComponent";
import ConfirmationModal from "../components/ConfirmationModal"; 

import { server } from "../utils/server";
import { useNotification } from "../utils/notificationContext";
import { useNavigate } from "react-router-dom";
const CreateInterventionPage = () => {
    const Navigate = useNavigate()

    const { showNotification } = useNotification();
    let clientName = useRef();
    let address = useRef();
    let contractNumber = useRef();
    let startingDate = useRef();
    const [availableMaterials, setAvailableMaterials] = useState([]);
    const [selectedMaterials, setSelectedMaterials] = useState([]);
useEffect(()=>{
    console.log(selectedMaterials);
    
},[selectedMaterials])
    useEffect(() => {
         fetch(server+"products/getAll", {
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json"
    },
    method: "GET"
}
   )
    .then((res) => res.json())
    .then((res) => {
        console.log('====================================');
        console.log(res);
        console.log('====================================');
      setAvailableMaterials(res)
    });
},[])


    function CreateInterventionBack() {
        let data = captureRef();
        console.log('====================================');
        console.log(data);
        console.log('====================================');
        fetch('http://localhost:3500/interventions/create', {
            method: "POST",
            headers: {
                "Accept": "*/*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => {
                if (!res.err) {
                    showNotification(res.msg)
                    setTimeout(() => {
                        Navigate("/interventions")
                    }, 1500)
                }else{
                    showNotification("Il y a eu une erreure lors de la création de l'intervention. Veuillez réessayer")
                }
            });
    }

    function captureRef() {
        return {
            clientName: clientName.current.value,
            location: address.current.value,
            contractNumber: contractNumber.current.value,
            startingDate: startingDate.current.value,
            materials:selectedMaterials
        };
    }

  

    return (
        <div className="create__client__form form">
            <div className="title">
                <div className="first-letter">Nouvelle</div>
                <div className="first-letter">Intervention</div>
            </div>
            <InputComp ref={clientName} label="Nom du Client" name="clientName" type="text" />
            <InputComp ref={address} label="Adresse" name="address" type="text" />
            <InputComp ref={contractNumber} label="Numéro de devis" name="contractNumber" type="text" />
            <InputComp ref={startingDate} label="Date de Début" name="startingDate" type="date" />
            <p>{selectedMaterials.length?selectedMaterials.length+" matériels selectionné":"Pas de matériel selectionné"}</p>
            <button onClick={() => showNotification(<SelectMaterials list={availableMaterials} selectedMaterials={selectedMaterials}  setSelectedMaterials={setSelectedMaterials} />,'valider')}>Sélectionner le Matériel</button>
            <button onClick={()=>showNotification(<Previsualisation data={captureRef()} />)}>Prévisualiser</button>
            <button onClick={() => CreateInterventionBack()}>Créer l'Intervention</button>
          
        </div>
    );
};

const Previsualisation = ({data})=>{
    function mapMaterials(){
        if( data.materials && data.materials.length>0){
            return(
                <>
                <b>Liste matériel</b>
            <div className="material__list__previsualisation">
                {data.materials.map((e,i)=>{
                    return <p>{e.name}<b>   {e.quantity&&"- " +e.quantity}</b></p>
                })}
            </div>
                </>)
        }
        return(
            <>
           pas de matériels séléctioné
            </>
        )
    }
    return(
        <div className="display__previsualisation">
            <h1>Données de l'intervention</h1>
            {data.clientName&&<p><b>Nom : </b>{data.clientName}</p>}
            {data.address&&<p><b>Adresse : </b> {data.address}</p>}
            {data.contractNumber&&<p><b>Numéro de Devis : </b> {data.contractNumber}</p>}
            {data.startingDate&&<p><b>Date de Début : </b> {data.startingDate}</p>}
            {mapMaterials()}
        </div>
    )
}
const SelectMaterials = ({ list,setSelectedMaterials,selectedMaterials }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedMaterial, setSelectedMaterial] = useState(null);
    const [quantity, setQuantity] = useState("");
    // Filtrer les matériaux selon la recherche
    const filteredList = list.filter((e) =>
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
            ref:selectedMaterial.ref,
            quantity:quantity
        }
        let tmp = selectedMaterials
        tmp.push(item)
        console.log('====================================');
        console.log(tmp);
        console.log('====================================');
        setSelectedMaterials(tmp);
            setSelectedMaterial(null); // Fermer la modal
    };

    return (
        <div className="material-list">
            <div className="input__container">
            <input
                type="text"
                placeholder="Rechercher un matériel..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            </div>
            
            <div className="material-items">
            {filteredList.length > 0 ? (
                    filteredList.map((e, i) => (
                        <div key={i} className="material-item" onClick={() => handleMaterialClick(e)}>
                            {e.name} <b>{e.quantity && e.quantity!==0 && "- "+ e.quantity+" En stock"}</b>
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
                            <button onClick={()=>confirmAddMaterial()} disabled={ quantity < 0}>
                                Confirmer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateInterventionPage;