import { Menu } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const NavComponent =()=>{
    let [state,setState] = useState(false)
    return(
        <>
        <div className={state?"nav__icon active":"nav__icon"} onClick={()=>{
            
            setState(!state)}}>{<Menu strokeWidth={3.3} />}</div>
        <div className={state?"nav__icon background__nav active":"nav__icon background__nav"}> </div>
        <div className={state?'nav__list active':'nav__list'}>
        <NavLink onClick={()=>setState(false)} to="/compte">compte</NavLink>
        <NavLink onClick={()=>setState(false)} to="/Interventions">Interventions</NavLink>
        </div>
        </>
    )
}
export default NavComponent