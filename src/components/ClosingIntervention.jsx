import { useRef } from "react"
import InputComp from "./inputComponent"

const ClosingInterventionComponent = ({ data ,toggle}) => {
    const endingDate = useRef()
    function closingSite() {
        let tmp = data
        tmp.endingDate = endingDate.current.value
        console.log(tmp);
        toggle()
        //fetch()
    }
    return (
        <div className="background__dialog visible">
            <div className="dialog__notification visible">
                <div className="dialog__content">                    <InputComp ref={endingDate} className="closingDate" label="Date de Clôture" name="endingDate" type="date" />
                </div>
                <button onClick={()=>toggle()}>annuler</button>
                <button onClick={()=>closingSite()}>cloturer</button>
            </div>
        </div>

    )
}
export default ClosingInterventionComponent