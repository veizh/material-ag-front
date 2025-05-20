import { Menu } from 'lucide-react';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const NavComponent =()=>{
    let [state,setState] = useState(false)
    let [role,setRole]=useState("remploye")
    useEffect(()=>{
        if(window.localStorage.getItem('user')){
            let user = JSON.parse(window.localStorage.getItem('user'))
           user.role&&setRole(user.role)
        }
    },[state])
    function disconnect(){
        window.localStorage.removeItem("JWT")
        window.localStorage.removeItem("user")
    }
    return(
        <>
        <div className={state?"nav__icon active":"nav__icon"} onClick={()=>{
            
            setState(!state)}}>{<Menu strokeWidth={3.3} />}</div>
        <div className={state?"nav__icon background__nav active":"nav__icon background__nav"}> </div>
        <div className={state?'nav__list active':'nav__list'}>
        {role==="admin"&&<NavLink onClick={()=>setState(false)} to="/accountManagement">compte</NavLink>}
        {role==="admin"&&<NavLink onClick={()=>setState(false)} to="/InterventionsEnd">Interventions Terminées</NavLink>}
        <NavLink onClick={()=>setState(false)} to="/Interventions">Interventions En Cours</NavLink>
        <NavLink onClick={()=>setState(false)} to="/TransfersList">Liste des transferts</NavLink>
        <NavLink onClick={()=>disconnect()} to="/">Se déconnecter</NavLink>
        </div>
        </>
    )
}
export default NavComponent