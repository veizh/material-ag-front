import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { server } from "../utils/server";
import { CirclePlus } from 'lucide-react';
const ClosedInterventions =()=>{
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
                        e.location?.toLowerCase().includes(searchTerm.toLowerCase())||
                        e.endingDate?.toLowerCase().includes(searchTerm.toLowerCase())||
                        e.startingDate?.toLowerCase().includes(searchTerm.toLowerCase())
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
                <h1>Interventions finis</h1>
        <input type="text" placeholder="Rechercher...." onChange={(e)=>(setSearchTerm(e.target.value))}/>

            </div>
            <div className="table__body">
                <table>
                    <thead>
                        <tr>
                            <th className="nowrap ">N° Devis</th>
                        <th className="nowrap">Group</th>

                            <th className="nowrap">Client</th>
                            <th className="nowrap">Date de départ</th>
                            <th className="nowrap">Date de Cloture</th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchTerm&&searchTerm.length>1?sortedInter?.map((e,i)=>{return e.state==="Terminé" && tableLine(e,i,Navigate)}):allInter?.map((e,i)=>{return e.state==="Terminé" && tableLine(e,i,Navigate)})}
                    </tbody>
                </table>
                
            </div>

        </main>
</div>
    )
}

export default ClosedInterventions

function tableLine(data,i,Navigate){
    
    return(
        <tr key={i} onClick={()=>Navigate("/intervention/"+data._id)}>
            <td className="nowrap"><b>{data.contractNumber?data.contractNumber:"N/R"}</b></td>
            <td className="bold groupName">{data.groupName}</td>
            <td className="clientName">{data.clientName}</td>
            <td className="nowrap">{data.startingDate?data.startingDate:"Non Renseigné"}</td>
            <td className="nowrap">{data.endingDate?data.endingDate:"Non Renseigné"}</td>

        </tr>
    )
}