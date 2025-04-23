import { useRef } from "react"
import InputComp from "./inputComponent"
import { useNotification } from "../utils/notificationContext"
const ClosingInterventionComponent = ({ data ,toggle}) => {
    const { showNotification,hideNotification } = useNotification();

    const endingDate = useRef()
    function closingSite() {
        let tmp = data
        tmp.endingDate = endingDate.current.value
        tmp.state="Terminé"
        fetch("http://localhost:3500/interventions/updateIntervention/"+data._id, {
            method: "PUT",
            headers: {
                "Accept": "*/*",
                "Content-Type": "application/json"
            },
            body:JSON.stringify(tmp)
        })
            .then(res => res.json())
            .then(res => {
                if (res.status===400 || res.status===500) {
                    showNotification("Il y a un problème")
                    
                }else{
                 showNotification("ALL GOOD")

                }
                
            });
        toggle()
        
    }
    return (
        <div className="background__dialog visible">
            <div className="dialog__notification visible">
                <div className="dialog__content">                    <InputComp ref={endingDate}  className="closingDate" label="Date de Clôture" name="endingDate" type="date" />
                </div>
                <button onClick={()=>toggle()}>annuler</button>
                <button onClick={()=>closingSite()}>cloturer</button>
            </div>
        </div>

    )
}
export default ClosingInterventionComponent