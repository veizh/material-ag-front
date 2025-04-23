import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { server } from "../utils/server";
import { CirclePlus } from 'lucide-react';

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
    const [sortedInter,setSortedInter] =useState()
    const [searchTerm,setSearchTerm] =useState()

    function filterAllInter(){
       
        let tmp = []
        if(allInter){
            allInter.map((e)=>{
                try {
                    if (
                        e.clientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        e.state?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        e.groupName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        e.contractNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        e.location?.toLowerCase().includes(searchTerm.toLowerCase())
                      ) {
                        tmp.push(e)
                    console.log(e.location);

                    }
                    console.log(tmp);
                        setSortedInter(tmp)
                        
                } catch (error) {
                    
                }
            
            
        })
        
        return 
    }
    }
    useEffect(()=>{

        filterAllInter()
    },[searchTerm])
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
       console.log(res);
       
    });
    setLoading(false)
},[])
    return(
        <div className="home__container">
        <main className="table">
            <div className="table__header">
                <h1>Interventions</h1>
        <input type="text" placeholder="Rechercher...." onChange={(e)=>(setSearchTerm(e.target.value))}/>

            </div>
            <div className="table__body">
                <table>
                    <thead>
                        <tr>
                        <th className="nowrap">Group</th>

                            <th className="nowrap">Client</th>
                            <th className="nowrap">Site</th>
                            <th className="nowrap state">Statut</th>
                            <th className="nowrap">Date de départ</th>
                            <th className="nowrap">Date de Cloture</th>
                            <th className="nowrap ">N° Devis</th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchTerm&&searchTerm.length>1?sortedInter?.map((e,i)=>{return tableLine(e,i,Navigate)}):allInter?.map((e,i)=>{return tableLine(e,i,Navigate)})}
                    </tbody>
                </table>
                
            </div>
        <button onClick={()=>Navigate("/createIntervention")}>NOUVELLE INTERVENTION<CirclePlus className="icon" size={40} /></button>

        </main>
</div>
    )
}
export default HomePage

function tableLine(data,i,Navigate){
    
    return(
        <tr key={i} onClick={()=>Navigate("/intervention/"+data._id)}>
            <td className="bold groupName">{data.groupName}</td>
            <td className="clientName">{data.clientName}</td>
            <td className="nowrap">{data.location}</td>
            {data.state==="En cours"&&<td className="nowrap state"><p className="bold blue">{data.state}</p></td>}
            {data.state==="Terminé"&&<td className="nowrap state"><p className="bold green">{"Cloturer"}</p></td>}
            <td className="nowrap">{data.startingDate?data.startingDate:"Non Renseigné"}</td>
            <td className="nowrap">{data.endingDate?data.endingDate:"Non Renseigné"}</td>
            <td className="nowrap"><b>{data.contractNumber?data.contractNumber:"N/R"}</b></td>

        </tr>
    )
}