import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { server } from "../utils/server";
import { CirclePlus } from 'lucide-react';
import { useSelect } from "../utils/selectContext";
import { Trash2 } from "lucide-react";

import useConfirmation from "../utils/useConfirmation.js"; 

const ClosedInterventions =()=>{
    const { modal, askConfirmation } = useConfirmation(); // Utilisation du hook de confirmation
    const Navigate = useNavigate()
    const [loading,setLoading] = useState(false)
    const [selectedGroup,setSelectedGroup] = useState()
    const [allInter,setAllInterventions] =useState()
    const [sortedInter,setSortedInter] =useState()
    const [searchTerm,setSearchTerm] =useState()
    const [allClient,setAllClient]=useState()
    const [filterGroup,setFilterGroup]=useState()
    const { showSelect } = useSelect();

     const deleteInter= async (e) =>{
            const isConfirmed = await askConfirmation(`Êtes-vous sûr de vouloir supprimer définitivement cette itnervention ?`)
            if(!isConfirmed) return
          console.log(e)
          fetch("http://localhost:3500/interventions/deleteOne/"+e._id,{
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json"
      },
      method: "delete"
  })  .then((res) => res.json())
  .then((res) => {
      console.log('====================================');
      console.log(res);
      console.log('====================================');
     window.location.reload()
  });
            
        }
function tableLine(data,i,Navigate){
    
    return(
        <tr key={i} >
            <td onClick={()=>Navigate("/intervention/"+data._id)} className="nowrap"><b>{data.contractNumber?data.contractNumber:"N/R"}</b></td>
            <td onClick={()=>Navigate("/intervention/"+data._id)} className="bold groupName">{data.groupName}</td>
            <td onClick={()=>Navigate("/intervention/"+data._id)} className="clientName">{data.clientName}</td>
            <td onClick={()=>Navigate("/intervention/"+data._id)} className="nowrap">{data.startingDate?data.startingDate:"Non Renseigné"}</td>
            <td onClick={()=>Navigate("/intervention/"+data._id)} className="nowrap">{data.endingDate?data.endingDate:"Non Renseigné"}</td>
            <td className="nowrap delete" onClick={()=>deleteInter(data)}><Trash2 /></td>

        </tr>
    )
}
    useEffect(()=>{
        fetch("https://back-material-ag.vercel.app/clients/getAllClients",{
            headers: {
                Accept: "*/*",
                "Content-Type": "application/json"
              },
              method: "GET"
          }
             )
              .then((res) => res.json())
              .then((res) => {
                console.log(res);
                let seen = new Set();
                let table = []
                table.push({placeholder:"Aucun"})
                res?.forEach(e => {
    if (!seen.has(e.groupName)) {
        seen.add(e.groupName);
        let tmp = { ...e, placeholder: e.groupName }; // on copie l'objet proprement
        table.push(tmp);
    }
})
                
                setAllClient(table)
              });
        
    },[])
     const handleOpen = (options,labelKey,fct) => {
        showSelect({
            options: options,
            labelKey: labelKey,
            onSelect: (obj) => {
                if(obj.placeholder==="Aucun"){
                    setFilterGroup(null)
                    return
                }
                fct(obj)
                console.log("Objet sélectionné :", obj);
            }
        });
    };
 function sortByEndingDate(interventions) {
    return [...interventions].sort((a, b) => {
        const dateA = a.endingDate ? new Date(a.endingDate) : null;
        const dateB = b.endingDate ? new Date(b.endingDate) : null;

        // Cas 1 : a sans date => il va après
        if (!dateA && dateB) return 1;

        // Cas 2 : b sans date => il va après
        if (dateA && !dateB) return -1;

        // Cas 3 : les deux sans date => égalité
        if (!dateA && !dateB) return 0;

        // Cas 4 : les deux ont des dates => tri décroissant
        return dateB - dateA;
    });
}
useEffect(() => {
    if (!filterGroup || !allInter) {
        setSortedInter(sortByEndingDate(allInter || []));
        return;
    }

    const filtered = allInter.filter(e => e.groupName === filterGroup.groupName);
    setSortedInter(sortByEndingDate(filtered));
}, [filterGroup, allInter]);
  function filterAllInter() {
    if (!allInter) return;

    const filtered = allInter.filter(e => {
        const matchesSearch = !searchTerm || (
            e.clientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            e.state?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            e.groupName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            e.contractNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            e.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            e.endingDate?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            e.startingDate?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        const matchesGroup = !filterGroup || e.groupName === filterGroup.groupName;

        return matchesSearch && matchesGroup;
    });

    setSortedInter(sortByEndingDate(filtered));
}
   useEffect(() => {
    filterAllInter();
}, [searchTerm, filterGroup]);
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
       setAllInterventions(sortByEndingDate(res))

       
    });
    setLoading(false)
},[])
    return(<>
        {modal}
        <div className="home__container">
        <main className="table">
            <div className="table__header">
                <h1>Interventions finis</h1>
        <input type="text" placeholder="Rechercher...." onChange={(e)=>(setSearchTerm(e.target.value))}/>

            </div>
                <button className="selectgroup" onClick={()=>{handleOpen(allClient,"placeholder",setFilterGroup)}}>{"Filtre Groupe"}</button>
            <div className="table__body closedinter">
                <table>
                    <thead>
                        <tr>
                            <th className="nowrap ">N° Devis</th>
                            <th className="nowrap">Group</th>

                            <th className="nowrap">Client</th>
                            <th className="nowrap">Date de départ</th>
                            <th className="nowrap">Date de Cloture</th>
                            <th className="nowrap"></th>
                        </tr>
                    </thead>
                    <tbody>
                      {(searchTerm && searchTerm.length > 1 ? sortedInter : filterGroup ? sortedInter : allInter)?.map((e, i) => {
                          return e.state === "Terminé" && tableLine(e, i, Navigate);
                        })}
                    </tbody>
                </table>
                
            </div>

        </main>
</div>
                        </>
    )
}

export default ClosedInterventions

