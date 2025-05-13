import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { useNotification } from "../utils/notificationContext";
import { formateDate } from "../utils/formateDate";

const TransferTicket = ()=>{
    const { id } = useParams();
 const [data,setData]=useState()
 const {showNotification} =useNotification()
 const [allInterventions,setAllInterventions] =useState()
 const Navigate =useNavigate()
    useEffect(()=>{
        fetch("https://back-material-ag.vercel.app/transfers/getOne/"+id,{
            method: "GET",
            headers: {
                "Accept": "*/*",
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.status===400) {
                    showNotification("Il y a un problème d'ID")
                    setTimeout(() => {
                        Navigate("/home")
                    }, (2000));
                }else{
                    console.log('====================================');
                    console.log(res);
                    console.log('====================================');
                    setData(res)
                }
                
            })
    },[])
    return (
        <div className="intervention__container">
            <div className="content">
                    <h1>Informations</h1>
                <div className="informations">
                    <p>Date:<b> {data &&formateDate(data.date) } </b></p>

                    <p>Tranfert de matériels du site de N° de devis <b>{data&&data.sender[0].contractNumber}</b> du groupe <b>{data&&data.sender[0].groupName.toUpperCase()}</b>, {data&&data.sender[0].clientName} au site de N° de devis<b> {data&&data.recipient[0].contractNumber}</b> du groupe <b>{data&&data.recipient[0].groupName.toUpperCase()}</b>, {data&&data.recipient[0].clientName} </p>
                </div>
                    <h1>Materiel transféré</h1>
                <div className="materials">
                    {data && data.materials.map((e,i)=>{
                        return(<div key={i} className="row__material"><p>{e.name}</p><div className="separation"></div><p>{e.quantity}</p></div>)
                    })}
                </div>
            </div>

            <div className="buttons__container">
            </div>
        </div>
    )

}

export default TransferTicket