import { useRef } from "react"
import InputComp from "../components/inputComponent"
const NewClientPage = (props) => {
    
    let groupName = useRef()
    let nameClient = useRef()
    let location = useRef()
    let codePostal = useRef()
    let ville = useRef()
    let inputs = [
        {
            label:"Groupe",   
            name: "groupName",
            type: "text",
            ref: groupName

        }
        ,
        {
            label:"Nom Client",
            name: "clientName",
            type: "text",
            ref: nameClient,
            pattern:"test"

        }, {
            label:"Adresse du site",
            name: "location",
            type: "text",
            ref: location

        }, {
            label:"Code Postal",
            name: "codePostal",
            type: "number",
            ref: codePostal

        }, {
            label:"Ville",
            name: "ville",
            type: "text",
            ref: ville

        }
    ]
    function CreateClientBack(){
            let data = captureRef()
            
            fetch('https://back-material-ag.vercel.app/clients/create',{
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

    
              }
            });
        }
    function captureRef() {
        let formObject = {
            groupName:groupName.current.value.toLocaleUpperCase(),
            clientName:nameClient.current.value.toLocaleUpperCase(),
            location:location.current.value,
            codePostal:codePostal.current.value,
            ville:ville.current.value,
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