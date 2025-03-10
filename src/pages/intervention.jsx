import { useEffect, useRef, useState } from "react";
import Select from "react-dropdown-select";
import useConfirmation from "../utils/useConfirmation.js"; 
import { useNotification } from "../utils/notificationContext.jsx"

import { useNavigate, useParams } from "react-router-dom";
import ClosingInterventionComponent from "../components/ClosingIntervention.jsx";
const InterventionPage = (props)=>{
    const Navigate = useNavigate()
    const [closingModalState,setClosingModalState] = useState(false)
    const [data,setData]=useState()
    const { id } = useParams();
    const { showNotification } = useNotification();
    function toggleClosingModal(){
        setClosingModalState(!closingModalState)
    }
    useEffect(()=>{
        fetch('http://localhost:3500/interventions/getOne/'+id, {
            method: "GET",
            headers: {
                "Accept": "*/*",
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.err) {
                    showNotification("Il y a un problème d'ID")
                    setTimeout(() => {
                        Navigate("/home")
                    }, (2000));
                }else{
                    setData(res)
                }
                
            });
    }
    ,[])
     
    return(
        <div className="intervention__container">
            {closingModalState && <ClosingInterventionComponent toggle={toggleClosingModal} data={data} />}
            <div className="content">
                    <h1>{data && data.clientName}</h1>
                <div className="informations">
                    <p>Date de départ : {data && data.startingDate}</p>
                    <p>{data && data.location}</p>
                </div>
                    <h1>materiels sur site</h1>
                <div className="materials">
                    {data && data.materials.map((e,i)=>{
                        return(<div key={i} className="row__material"><p>{e.name}</p><div className="separation"></div><p>{e.quantity}</p></div>)
                    })}
                </div>
            </div>

            <div className="buttons__container">
                <div onClick={()=>{
                    showNotification(<ModalConfirm AllCurrentSite={fakeData} allMaterial={data && data.materials} />,"Annulé")
                }}className="btn transfer">Transferer du matériel</div>
                <div onClick={()=>toggleClosingModal()} className="btn end">Cloturer le site</div>
            </div>
        </div>
    )
}
const ModalConfirm = (props) => {
    const { modal, askConfirmation } = useConfirmation(); // Utilisation du hook de confirmation
    const [values, setValues] = useState([]); // Valeur du site sélectionné
    const [materialsSelected, setMaterialsSelected] = useState([]); // Matériaux sélectionnés
    const [data, setData] = useState([]); // Données des sites
    const { showNotification } = useNotification();

    useEffect(() => {
        console.log('====================================');
        console.log(props.allMaterial);
        console.log('====================================');
        let tmp = props.AllCurrentSite.filter(e => e.state === "En cours");
        setData(tmp);
    }, [props.AllCurrentSite]);

    // Fonction pour ajouter un matériau sélectionné
    const pushtoselecteMaterials = (e) => {
        setMaterialsSelected(prevState => [...prevState, ...e]);
    };

    // Fonction pour supprimer un matériau sélectionné
    const removeMaterial = (index) => {
        setMaterialsSelected((prev) => prev.filter((_, i) => i !== index));
    };

    // Fonction pour confirmer le transfert du matériel
    const handleTransfer = async () => {
        const isConfirmed = await askConfirmation(   `Êtes-vous sûr de vouloir transférer ce matériel au site de ${values[0].clientName} situé à ${values[0].siteLocation} ?`)
        if (isConfirmed) {
            console.log("Matériel transféré:", materialsSelected);
            
            showNotification("Le transfert à été effectué","Ok")

            // Ici tu peux ajouter la logique de transfert (par exemple mettre à jour l'état, envoyer les données à un serveur, etc.)
        } else {
            console.log("Transfert annulé");
            showNotification("Le transfert à été annulé","Ok")

        }
    };

    return (
        <>
            {modal} {/* Affiche la modale uniquement si nécessaire */}

            <Select 
        className="select"
                options={data} 
                valueField={"siteLocation"} 
                labelField={"siteLocation"} 
                placeholder="Select a client"
                onChange={(newValues) => setValues(newValues)} 
            />
            <Select 
        className="select"

                options={props.allMaterial} 
                valueField={"name"} 
                labelField={"name"} 
                placeholder="Select material"

                onChange={(newValues) => {
                    pushtoselecteMaterials(newValues);
                }} 
            />

            {materialsSelected.map((e, i) => (
                <MaterialRow 
                    key={i} 
                    product={e.name} 
                    quantity={e.quantity} 
                    onRemove={() => removeMaterial(i)} 
                />
            ))}

            <button  onClick={()=>{
                    if(values.length===0){
                        console.log('====================================');
                        console.log("besoin de selectionner un client");
                        console.log('====================================');
                        return 
                    }
                
                handleTransfer()}} className="btn transfer">
                Transférer le matériel
            </button>
        </>
    );
};


const MaterialRow = ({ product, quantity, onRemove, onQuantityChange }) => {
    return (
        <div className="material__row" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <p>{product}</p>
            <input 
                type="number" 
                value={quantity} 
                onChange={(e) => onQuantityChange(e.target.value)}
                style={{ width: "60px", textAlign: "center" }}
            />
            <div onClick={onRemove} style={ {cursor: "pointer"}}>❌</div>
        </div>
    );
};


const fakeData = [
    {
        clientName: "Société Alpha",
        siteLocation: "Paris, France",
        startingDate: "2024-05-12",
        state: "En cours",
        test:"hehehe",
        test2:"ah ahahaaaa aaaaaaaaa aaaaaaaaaaaaaaa"
    },
    {
        clientName: "Entreprise Beta",
        siteLocation: "Lyon, France",
        startingDate: "2024-03-28",
        state: "Terminé",
        test:"hehehe",
        test2:"ahahah"
    },
    {
        clientName: "Groupe Gamma",
        siteLocation: "Marseille, France",
        startingDate: "2024-07-10",
        state: "Planifié",
        test:"hehehe",
        test2:"ahahah"
    },
    {
        clientName: "Société Delta",
        siteLocation: "Toulouse, France",
        startingDate: "2023-11-15",
        state: "En cours",
        test:"hehehe",
        test2:"ahahah"
    },
    {
        clientName: "Entreprise Epsilon",
        siteLocation: "Bordeaux, France",
        startingDate: "2024-01-05",
        state: "En cours",
        test:"hehehe",
        test2:"ahahah"
    },
    {
        clientName: "Groupe Zeta",
        siteLocation: "Nice, France",
        startingDate: "2024-06-20",
        state: "Annulé",
        test:"hehehe",
        test2:"ahahah"
    },{
        clientName: "Société Alpha",
        siteLocation: "Paris, France",
        startingDate: "2024-05-12",
        state: "En cours",
        test:"hehehe",
        test2:"ahahah aaaaaaaaaa aaaaaaaaaaa aaaaaaa"
    },
    {
        clientName: "Entreprise Beta",
        siteLocation: "Lyon, France",
        startingDate: "2024-03-28",
        state: "Terminé",
        test:"hehehe",
        test2:"ahahah"
    },
    {
        clientName: "Groupe Gamma",
        siteLocation: "Marseille, France",
        startingDate: "2024-07-10",
        state: "Planifié",
        test:"hehehe",
        test2:"ahahah"
    },
    {
        clientName: "Société Delta",
        siteLocation: "Toulouse, France",
        startingDate: "2023-11-15",
        state: "En cours",
        test:"hehehe",
        test2:"ahahah"
    },
    {
        clientName: "Entreprise Epsilon",
        siteLocation: "Bordeaux, France",
        startingDate: "2024-01-05",
        state: "En cours",
        test:"hehehe",
        test2:"ahahah"
    },{
        clientName: "Société Alpha",
        siteLocation: "Paris, France",
        startingDate: "2024-05-12",
        state: "En cours",
        test:"hehehe",
        test2:"ahahahaaaa aaaaaaaaaa aaaaaaaaaaaaaa"
    },
    {
        clientName: "Entreprise Beta",
        siteLocation: "Lyon, France",
        startingDate: "2024-03-28",
        state: "Terminé",
        test:"hehehe",
        test2:"ahahah"
    },
    {
        clientName: "Groupe Gamma",
        siteLocation: "Marseille, France",
        startingDate: "2024-07-10",
        state: "Planifié",
        test:"hehehe",
        test2:"ahahah"
    },
    {
        clientName: "Société Delta",
        siteLocation: "Toulouse, France",
        startingDate: "2023-11-15",
        state: "En cours",
        test:"hehehe",
        test2:"ahahah"
    },
    {
        clientName: "Entreprise Epsilon",
        siteLocation: "Bordeaux, France",
        startingDate: "2024-01-05",
        state: "En cours",
        test:"hehehe",
        test2:"ahahah"
    },
];
export default InterventionPage