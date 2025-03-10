import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { server } from "../utils/server";

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

const HomePage =()=>{
    const Navigate = useNavigate()
    const [loading,setLoading] = useState(false)
    const [allInter,setAllInterventions] =useState()
useEffect(()=>{
    setLoading(true)
    fetch(server+"interventions/getAllInterventions",{
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json"
        },
        method: "GET"
    })  .then((res) => res.json())
    .then((res) => {
       setAllInterventions(res)
    });
    setLoading(false)
},[])
    return(
        <div className="home__container">
        <button onClick={()=>Navigate("/createIntervention")}>NOUVELLE INTERVENTION</button>
        <main className="table">
            <div className="table__header">
                <h1>Interventions</h1>
            </div>
            <div className="table__body">
                <table>
                    <thead>
                        <tr>
                            <th className="nowrap">Client</th>
                            <th className="nowrap">Site</th>
                            <th className="nowrap">Date de départ</th>
                            <th className="nowrap state">Statut</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allInter&&allInter.map((e,i)=>{return tableLine(e,i,Navigate)})}
                    </tbody>
                </table>
            </div>
        </main>
</div>
    )
}
export default HomePage

function tableLine(data,i,Navigate){
    
    return(
        <tr key={i} onClick={()=>Navigate("/intervention/"+data._id)}>
            <td className="bold">{data.clientName}</td>
            <td className="nowrap">{data.location}</td>
            <td className="nowrap">{data.startingDate}</td>
            {data.state==="En cours"&&<td className="nowrap state"><p className="bold blue">{data.state}</p></td>}
            {data.state==="Terminé"&&<td className="nowrap state"><p className="bold green">{data.state}</p></td>}
            {data.state==="Annulé"&&<td className="nowrap state"><p className="bold red">{data.state}</p></td>}
            {data.state==="Planifié"&&<td className="nowrap state"><p className="bold yellow">{data.state}</p></td>}
        </tr>
    )
}