import { useRef } from "react"
import InputComp from "../components/inputComponent"
import { server } from "../utils/server"
const NewClientPage = (props) => {
    
    let groupe = useRef()
    let nameClient = useRef()
    let number = useRef()
    let adress = useRef()
    let inputs = [
        {
            label:"Groupe",   
            name: "group",
            type: "text",
            ref: groupe

        }
        ,
        {
            label:"Nom Client",
            name: "clientName",
            type: "text",
            ref: nameClient,
            pattern:"test"

        }, {
            label:"Numéro de devis",
            name: "number",
            type: "text",
            ref: number

        }
    ]
    function CreateClientBack(){
            let data = captureRef()
            
            fetch(server+'clients/create',{
                method:"POST",
                headers: {
                    "Accept": "*/*",
                    "Content-Type": "application/json"
                  },
                  body:JSON.stringify(data)
            })
            .then((res) => res.json())
            .then((res) => {
              if(res.err){
                props.setNotificationContent(res.err)
                props.setNotificationState(true)
    
              }
            });
        }
    function captureRef() {
        let formObject = {
            groupName:groupe.current.value.toLocaleUpperCase(),
            clientName:nameClient.current.value.toLocaleUpperCase(),
            contractNumber:number.current.value,
        }
        console.log('====================================');
        console.log("objet envoyé au back:",formObject);
        console.log('====================================');
        return formObject

    }
    return (
        <div className="create__client__form form">
            <div className="title"><div className="first-letter">Nouveau</div> <div className="first-letter">Client</div></div>
            {
                inputs.map((e,i) => {
                    return (
                        <InputComp ref={e.ref} label={e.label} name={e.name} type={e.type} pattern={e.pattern&&e.pattern} key={i}/>
                    )
                })
            }
            <button onClick={()=>CreateClientBack()}>Ajouter un client</button>
        </div>
    )
}
export default NewClientPage