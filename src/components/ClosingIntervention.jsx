import { useEffect, useRef, useState } from "react"
import InputComp from "./inputComponent"
import { useNotification } from "../utils/notificationContext"
import MaterialSelector from "./materialSelector"
import { useNavigate } from "react-router-dom";

const ClosingInterventionComponent = ({ data, toggle }) => {

    const { showNotification } = useNotification();
    const endingDate = useRef();
    const [seconds, setSeconds] = useState(null);
    const [materialsReturned, setMaterialsReturned] = useState([]);
    const Navigate = useNavigate()
      // État pour stocker le temps restant

  // Effet pour gérer le minuteur
  useEffect(() => {
    // Si le temps est déjà écoulé, on ne fait rien
    if (seconds === 0) return;

    // Crée une intervalle pour décrémenter le temps toutes les secondes
    const interval = setInterval(() => {
      setSeconds(prev => prev - 1);
    }, 1000);

    // Nettoyer l'intervalle lorsque le composant est démonté ou quand le minuteur est terminé
    return () => clearInterval(interval);
  }, [seconds]);
    const closingSite = () => {
 // Cette fonction sera réexécutée chaque fois que `seconds` change
        console.log('====================================');
        console.log(materialsReturned);
        console.log(endingDate.current.value);
        console.log(data);
        console.log('====================================');
        fetch('http://localhost:3500/interventions/getAllTransfer/' + data._id, {
            method: "PUT",
            headers: {
                "Accept": "*/*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({materialsReturned:materialsReturned,endingDate:endingDate.current.value})
        })

        .then(res=>res.json())
        setSeconds(10)
        showNotification("Veuillez patienter quelques instants ....")
        setTimeout(() => {
            Navigate("/InterventionsEnd")
        }, 5000);

        // const updated = {
        //     ...data,
        //     endingDate: endingDate.current.value,
        //     state: "Terminé",
        //     materialsReturned: materialsReturned
        // };
        // fetch("https://back-material-ag.vercel.app/interventions/updateIntervention/" + data._id, {
        //     method: "PUT",
        //     headers: {
        //         "Accept": "*/*",
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify(updated)
        // })
        // .then(res => res.json())
        // .then(res => {
        //     if (res.status === 400 || res.status === 500) {
        //         showNotification("Il y a un problème");
        //     } else {
        //         showNotification("Clôture réussie !");
        //     }
        //     toggle();
        // });
    };

    return (
        <div className="background__dialog visible">
            <div className="dialog__notification visible">
                <div className="dialog__content">
                    <InputComp ref={endingDate} className="closingDate" label="Date de Clôture" name="endingDate" type="date" />
                    <MaterialSelector
                        initialMaterials={data.materials}
                        showSiteSelector={false}
                        onConfirm={(materials) => setMaterialsReturned(materials)}
                    />
                </div>
                <button onClick={toggle}>Annuler</button>
                <button onClick={closingSite}>Clôturer</button>
            </div>
        </div>
    );
};
export default ClosingInterventionComponent