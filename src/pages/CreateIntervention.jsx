import { useEffect, useRef, useState } from "react";
import InputComp from "../components/inputComponent";
import ConfirmationModal from "../components/ConfirmationModal"; 

import { server } from "../utils/server";
import { useNotification } from "../utils/notificationContext";
import { useNavigate } from "react-router-dom";
import { useSelect } from "../utils/selectContext";
const CreateInterventionPage = () => {
    const Navigate = useNavigate()
    const { showNotification,hideNotification } = useNotification();
    let clientName = useRef();
    let location = useRef();
    let groupName = useRef();
    let codePostal = useRef();
    let ville = useRef();
    let contractNumber = useRef();
    const { showSelect } = useSelect();
    let [allClient,setAllClient] = useState()
    let startingDate = useRef();
    const [availableMaterials, setAvailableMaterials] = useState([]);
    const [selectedMaterials, setSelectedMaterials] = useState([]);
    const [clientPreset, setClientPreset] = useState();

    function remplirClientPreset(){
        clientName.current.value= clientPreset.clientName
        groupName.current.value =clientPreset.groupName
        location.current.value=clientPreset.location
        ville.current.value=clientPreset.ville
        codePostal.current.value=clientPreset.codePostal
    }
    useEffect(()=>{
        fetch("https://back-material-ag.vercel.app/clients/getAllClients",{
            headers: {
                Accept: "*/*",
                "Content-Type": "application/json"
              },
              method: "GET"
          }
             )
              .then((res) => res.json())
              .then((res) => {
                console.log(res);
                let table = []
                res?.map(e=>{
                    let tmp =e
                    tmp.placeholder =e.groupName+" - " + e.clientName+" - "+ e.ville+" - " + e.codePostal +" - " + e.location
                    table.push(tmp)
                })
                setAllClient(table)
              });
        
    },[])
useEffect(()=>{
     clientPreset && remplirClientPreset()
    console.log("client séléctionné",clientPreset);
    
},[clientPreset])
    useEffect(() => {
         fetch("https://stock-ag-back.vercel.app/products/getAll", {
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json"
    },
    method: "GET"
}
   )
    .then((res) => res.json())
    .then((res) => {
      setAvailableMaterials(res)
    });
},[])


    function CreateInterventionBack() {
        let data = captureRef();
        if(!data.startingDate || !data.clientName || !data.contractNumber  ||  !data.location||  !data.codePostal||  !data.ville){
            return showNotification('Veuillez remplir tout les champs !',"ok")
        }
        let clientData = {
            clientName: clientName.current.value.toLowerCase(),
            groupName: groupName.current.value.toLowerCase(),
            location: location.current.value.toLowerCase(),
            codePostal: codePostal.current.value.toLowerCase(),
            ville: ville.current.value.toLowerCase(),
        };
        console.log(clientData);
        let tmp = {
            clientData:clientData,
            intervention:data
        }
        fetch('https://back-material-ag.vercel.app/interventions/create', {
            method: "POST",
            headers: {
                "Accept": "*/*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tmp)
        })
            .then(res => res.json())
            .then(res => {
                if (!res.err) {
                    showNotification(res.msg)
                    setTimeout(() => {
                        Navigate("/interventions")
                    }, 500)
                }else{
                    showNotification("Il y a eu une erreure lors de la création de l'intervention. Veuillez réessayer")
                }
            });
    }

    function captureRef() {
        return {
            clientName: clientName.current.value.toLowerCase(),
            groupName: groupName.current.value.toLowerCase(),
            location: location.current.value.toLowerCase(),
            codePostal: codePostal.current.value.toLowerCase(),
            ville: ville.current.value.toLowerCase(),
            contractNumber: contractNumber.current.value.toLowerCase(),
            startingDate: startingDate.current.value.toLowerCase(),
            materials:selectedMaterials
        };
    }

    const handleOpen = (options,labelKey,fct) => {
        showSelect({
            options: options,
            labelKey: labelKey,
            onSelect: (obj) => {
                fct(obj)
                console.log("Objet sélectionné :", obj);
            }
        });
    };

    return (
        <div className="create__client__form form">
            <div className="title">
                <div className="first-letter">Nouvelle</div>
                <div className="first-letter">Intervention</div>
            </div>
            {//<button className="presetClient" onClick={()=> showNotification(<ModalClient allClient={allClient} hideNotification={hideNotification} setClientPreset={setClientPreset} />,"Annuler")}>Presets Client</button>
}
<button className="preset" onClick={()=>{handleOpen(allClient,"placeholder",setClientPreset)}}>preset</button>
           <InputComp ref={groupName}  label="Groupe" name="groupName" type="text" />
            <InputComp ref={clientName} label="Nom du Client" name="clientName" type="text" />
            <InputComp ref={location} label="Adresse" name="location" type="text" />
            <InputComp ref={codePostal} label="Code postale" name="codePostal" type="text" />
            <InputComp ref={ville} label="Ville" name="ville" type="text" />
            <InputComp ref={contractNumber} label="Numéro de devis" name="contractNumber" type="number" />
            <InputComp ref={startingDate} label="Date de Début" place name="startingDate" type="date" />
            
           {/* <button onClick={() => showNotification(<SelectMaterials list={availableMaterials} selectedMaterials={selectedMaterials}  setSelectedMaterials={setSelectedMaterials} />,'valider')}>Sélectionner le Matériel</button>
            <button onClick={()=>showNotification(<Previsualisation data={captureRef()} />)}>Prévisualiser</button>*/}
            <button onClick={() =>{
                CreateInterventionBack()
                console.log('====================================');
                console.log(captureRef());
                console.log('====================================');
                
            }}>Créer l'Intervention</button>
          
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
            {data.groupName&&<p><b>Groupe : </b>{data.groupName}</p>}
            {data.clientName&&<p><b>Nom : </b>{data.clientName}</p>}
            {data.location&&<p><b>Adresse : </b> {data.location}</p>}
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

    return (<>
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
        </div></>
    );
};

const ModalClient = (props)=>{
    const {hideNotification} = useNotification()
 
    return(
        <>
        <div className="clientList">
            {props.allClient?.map((e,i)=>{
                return (
                    <p onClick={()=>{
                        props.setClientPreset(e)
                        hideNotification()
                    }
                        } key={i}> 
                        <b>{e.groupName && e.groupName}</b> <em>{e.clientName && e.clientName}</em><br/> {e.ville && e.ville} {e.codePostal && e.codePostal} {e.location && e.location}
                    </p>
                )
            })}
            </div>
        </>
    )
}
export default CreateInterventionPage;