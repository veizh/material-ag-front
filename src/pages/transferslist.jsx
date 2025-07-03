import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { server } from "../utils/server";
import { Trash2 } from 'lucide-react';
import { formateDate } from "../utils/formateDate";
import useConfirmation from "../utils/useConfirmation.js"; 

    
const TransfersList =()=>{
    const { modal, askConfirmation } = useConfirmation(); // Utilisation du hook de confirmation
    const Navigate = useNavigate()
    const [loading,setLoading] = useState(false)
    const [allTransfers,setAllTransfers] =useState()
    const [allInterventions,setAllInterventions] =useState()
    const [sortedtransfers,setSortedtransfers] =useState()
    const [searchTerm,setSearchTerm] =useState()
        const deleteTransfer= async (e) =>{
            const isConfirmed = await askConfirmation(`Êtes-vous sûr de vouloir supprimer définitivement ce ticket de transfert ?`)
            if(!isConfirmed) return
          console.log(e)
          fetch("https://back-material-ag.vercel.app/transfers/deleteOne/"+e._id,{
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
function tableLine(data,i,allInterventions,Navigate){
 
    return(
        <tr key={i} >
            <td onClick={()=>Navigate("/transferTicket/"+data._id)}className="groupName">{data && data.sender[0].contractNumber+" " }<b>{ data&& data.sender[0].groupName + " "}   </b>{data && data.sender[0].clientName} </td>
            <td onClick={()=>Navigate("/transferTicket/"+data._id)} className="groupName">{data && data.recipient[0].contractNumber+ " "}<b>{ data&& data.recipient[0].groupName + " "}  </b>{data && data.recipient[0].clientName}</td>
            <td onClick={()=>Navigate("/transferTicket/"+data._id)}className="nowrap">{data.date?formateDate(data.date):"Non Renseigné"}</td>
            <td className="nowrap delete" onClick={()=>deleteTransfer(data)}><Trash2 /></td>

        </tr>
    )
}
    function filterAllTransfer(){
       
        let tmp = []
        if(allTransfers){
            allTransfers.map((e)=>{
                console.log('====================================');
                console.log(e);
               try {
                   if (
                       e.sender[0].clientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       e.sender[0].groupName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       e.sender[0].contractNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       e.recipient[0].clientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       e.recipient[0].groupName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       e.recipient[0].contractNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       e.date?.toLowerCase().includes(searchTerm.toLowerCase()) 
                     ) {
                       tmp.push(e)

                   }
                   setSortedtransfers(tmp)
                       
               } catch (error) {
                   
               }
            
            
        })
        
        return 
    }
    }
    useEffect(()=>{

        filterAllTransfer()
    },[searchTerm])
    async function askConfirmationFunction(){
 console.log(await askConfirmation())
    }
useEffect(()=>{
    setLoading(true)
    fetch("https://back-material-ag.vercel.app/transfers/getAll",{
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json"
        },
        method: "GET"
    })  .then((res) => res.json())
    .then((res) => {
        console.log('====================================');
        console.log(res);
        console.log('====================================');
       setAllTransfers(res)
       
    });
    
  
    setLoading(false)
       
},[])
useEffect(()=>{

    
    console.log('====================================');
    console.log(allTransfers);
    console.log('====================================');
},[allTransfers])
    return(
        <div className="home__container">
            {modal}
        <main className="table">
            <div className="table__header">
                <h1 >Transferts</h1>
        <input type="text" placeholder="Rechercher...." onChange={(e)=>(setSearchTerm(e.target.value))}/>

            </div>
            <div className="table__body">
                <table>
                    <thead>
                        <tr>
                            <th className="nowrap ">Expediteur</th>
                        <th className="nowrap">Destinataire</th>

                            <th className="nowrap">Date</th>
                            <th className="nowrap"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchTerm&&searchTerm.length>0?sortedtransfers?.map((e,i)=>{return tableLine(e,i,allInterventions,Navigate)}):allTransfers?.map((e,i)=>{return tableLine(e,i,allInterventions,Navigate)})}
                    </tbody>
                </table>
                
            </div>

        </main>
</div>
    )
}
export default TransfersList




// Il faut refaire la logique du composant => map recipient and sender pour tout les tickets et définir une nouvelle liste de ticket