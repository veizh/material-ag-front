import { useRef, useState } from "react"
import InputComp from "./inputComponent"
import { useNotification } from "../utils/notificationContext"
import MaterialSelector from "./materialSelector"
const ClosingInterventionComponent = ({ data, toggle }) => {
    
    const { showNotification } = useNotification();
    const endingDate = useRef();
    const [materialsReturned, setMaterialsReturned] = useState([]);

    const closingSite = () => {

        console.log('====================================');
        console.log(materialsReturned);
        console.log('====================================');
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