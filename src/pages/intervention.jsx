import { useEffect, useRef, useState } from "react";
import Select from "react-dropdown-select";
import useConfirmation from "../utils/useConfirmation.js"; 
import { useNotification } from "../utils/notificationContext.jsx"
import { useNavigate, useParams } from "react-router-dom";
import { useSelect } from '../utils/selectContext';
import ClosingInterventionComponent from "../components/ClosingIntervention.jsx";
import { server } from "../utils/server.js";
import AddMaterial from "../components/AddMaterial.jsx";
const InterventionPage = (props)=>{
    const Navigate = useNavigate()
    const [closingModalState,setClosingModalState] = useState(false)
    const [data,setData]=useState()
    
    const [availableMaterials, setAvailableMaterials] = useState([]);
    const [selectedMaterials, setSelectedMaterials] = useState([]);
    const [allSites,setAllSites] = useState()
    const [showAddMaterialModal, setShowAddMaterialModal] = useState(false);
    const { id } = useParams();
    const { showNotification } = useNotification();
      let [role,setRole]=useState("remploye")
    useEffect(()=>{
        if(window.localStorage.getItem('user')){
            let user = JSON.parse(window.localStorage.getItem('user'))
           user.role&&setRole(user.role)
        }
    },[])
    function toggleClosingModal(){
        setClosingModalState(!closingModalState)
    }
  
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
    useEffect(()=>{
        fetch('https://back-material-ag.vercel.app/interventions/getOne/'+id, {
            method: "GET",
            headers: {
                "Accept": "*/*",
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.status===400) {
                    showNotification("Il y a un problème d'ID")
                    setTimeout(() => {
                        Navigate("/home")
                    }, (2000));
                }else{
                    console.log('====================================');
                    console.log(res);
                    console.log('====================================');
                    setData(res)
                }
                
            });
            fetch('https://back-material-ag.vercel.app/interventions/getAllInterventions',{
                method:"GET",
                headers:{
                    "Accept": "*/*",
                    "Content-Type": "application/json"
                }
            })
            .then(res => res.json())
            .then(res => {
                if (res.err) {
                    setTimeout(() => {
                        Navigate("/home")
                    }, (2000));
                }else{
                   let tmp = []
                    res.filter(e=>e._id!==id).map(e=>{
                        if(e.state!=="En cours")return
                        else{
                            tmp.push(e)
                        }
                    })
                    setAllSites(tmp)
                }
                
            });
    }
    ,[])
     
    return(
        <div className="intervention__container">
            {closingModalState && <ClosingInterventionComponent toggle={toggleClosingModal} data={data} />}
            <div className="content">
                    <h1>{data && data.groupName} - {data && data.clientName}</h1>
                <div className="informations">
                    <p>Statut :<b> {data && data.state}</b></p>
                    <p>N° devis :<b> {data && data.contractNumber}</b></p>
                    <p>Date de départ : {data && data.startingDate}</p>
                    {data&&data.endingDate&&<p>Date de cloture : {data.endingDate}</p>}
                    <p>{data && (data.location+", "+data.ville+", "+data.codePostal)}</p>
                </div>
                    <h1>{data&&data.state==="En cours"?'materiels sur site':"Matériels utilisés"}</h1>
                <div className="materials">
                    {data && data.materials.map((e,i)=>{
                        if(e.quantity===null || e.quantity ===0) return
                        return(<div key={i} className="row__material"><p className="nametxt">{e.name}</p><div className="separation"></div><p className="qty">{e.quantity}</p></div>)
                    })}
                </div>
            </div>

               {data&&data.state==="En cours"&&
            <div className="buttons__container">
                
                <><div onClick={()=>{
                    showNotification(<ModalConfirm site={data} AllCurrentSite={allSites} allMaterial={data && data.materials} />,"Annuler")
                }}className="btn transfer">Transferer du matériel</div>
                <div onClick={()=>setShowAddMaterialModal(true)} className="btn add">Ajouter du matériel</div>
                {showAddMaterialModal && <AddMaterial dataInter={data} list={availableMaterials}selectedMaterials={selectedMaterials}setSelectedMaterials={setSelectedMaterials}onClose={() => setShowAddMaterialModal(false)}/>}
                {role==="admin"&&<div onClick={()=>toggleClosingModal()} className="btn end">Cloturer le site</div>}</>
                
            </div>}
        </div>
    )
}
const ModalConfirm = (props) => {
    const { modal, askConfirmation } = useConfirmation(); // Utilisation du hook de confirmation
    const [values, setValues] = useState(); // Valeur du site sélectionné
    const [materialsSelected, setMaterialsSelected] = useState([]); // Matériaux sélectionnés
    const [data, setData] = useState([]); // Données des sites
    const { showNotification } = useNotification();
    const { showSelect } = useSelect();
    useEffect(() => {
        let tmp =[]
        props.AllCurrentSite?.map(e=>{
            
            let x = e
            x.placeholder = [e.groupName ,e.clientName, e.ville, e.location,e.contractNumber].filter(Boolean).join(' - ');
            tmp.push(x)
        })
        setData(tmp);
        
    }, [props.AllCurrentSite]);
    useEffect(() => {
        console.log('====================================');
        console.log("test values:",values);
        console.log('====================================');
        
    }, [values]);
    // Fonction pour ajouter un matériau sélectionné
    const pushtoselecteMaterials = (e) => {
        const toAdd = Array.isArray(e) ? e : [e]; // Assure que c'est un tableau
        setMaterialsSelected(prevState => [...prevState, ...toAdd]);
    };
    // Fonction pour supprimer un matériau sélectionné
    const removeMaterial = (index) => {
        setMaterialsSelected((prev) => prev.filter((_, i) => i !== index));
    };
    const handleOpen = (options,labelKey,fct,excluded) => {
showSelect({
    options: options,
    onSelect: (obj) => {
                fct(obj)
                console.log("Objet sélectionné :", obj);
            },
    labelKey: labelKey,
    excluded: excluded?excluded:[] // tableau d’objets avec _id
});
       
    };
    // Fonction pour confirmer le transfert du matériel
    const handleTransfer = async () => {
        console.log("Matériel transféré:", materialsSelected);
            console.log("siteA:", props.site);
            console.log("siteB:", values);
            if (!values) {
                showNotification("Veuillez d'abord sélectionner un site","Ok");
                return;
            }
        const isConfirmed = await askConfirmation(   `Êtes-vous sûr de vouloir transférer ce matériel au site de ${values.clientName} situé à ${values.location} ?`)
        if (isConfirmed) {
            console.log("Matériel transféré:", materialsSelected);
            console.log("siteA:", props.site);
            console.log("siteB:", values);
            let objectSites = {
                siteA:props.site,
                siteB:values,
                materialsSelected:materialsSelected
            }
            fetch("https://back-material-ag.vercel.app/interventions/transferMaterial/", {
                method: "PUT",
                headers: {
                    "Accept": "*/*",
                    "Content-Type": "application/json"
                },
                body:JSON.stringify(objectSites)
            })
                .then(res => res.json())
                .then(res => {
                    if(res.status===400 ){
                        showNotification("Erreur lors du transfer","Ok")

                    }else{

                        showNotification("Le transfert à été effectué","Ok")
                              setTimeout(() => {
            window.location.reload()
        }, 1200);
                    }
                }
                )
            // Ici tu peux ajouter la logique de transfert (par exemple mettre à jour l'état, envoyer les données à un serveur, etc.)
        } else {
            console.log("Transfert annulé");
            showNotification("Le transfert à été annulé","Ok")

        }
    };
        
    return (
        <>
            {modal} {/* Affiche la modale uniquement si nécessaire */}

       
            <div className="selectBtn" onClick={()=>handleOpen(data,"placeholder",setValues)} >{values?values.clientName+ " " + values.location:"Selectionnez un site" }</div>
            <div className="selectBtn mgb" onClick={()=>handleOpen(props.allMaterial,"name",pushtoselecteMaterials,materialsSelected)} >Selectionnez le matériel </div>
            <div className="material-items">

            {materialsSelected.map((e, i) => (
                <MaterialRow 
                key={i} 
                product={e.name} 
                quantity={e.quantity} 
                onRemove={() => removeMaterial(i)} 
                onChangeQuantity={(x)=>{
                    const newMaterials = [...materialsSelected];
                    newMaterials[i] = {
                        ...newMaterials[i],
                        quantity: x.target.value
                    };
                    setMaterialsSelected(newMaterials);
                    
                }
            }
            />
        ))}
        </div>

            <button  onClick={()=>{
                    if(!values){
                        console.log('====================================');
                        console.log("besoin de selectionner un client");
                        console.log('====================================');
                        return 
                    }
                
                handleTransfer()}} className="btn transfer oranged">
                TRANSFERER LE MATERIEL
            </button>
        </>
    );
};


const MaterialRow = ({ product, quantity, onRemove,onChangeQuantity }) => {
    return (
        <div className="material__row" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <p>{product}</p>
            <input 
                type="number" 
                defaultValue={quantity}
                onChange={(e) => onChangeQuantity(e)}
                style={{ width: "100px", textAlign: "center" }}
            />
            <div onClick={onRemove} style={ {cursor: "pointer"}}>❌</div>
        </div>
    );
};

export default InterventionPage