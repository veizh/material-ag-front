import { KeySquare,User } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { server } from '../utils/server';
import { useNotification } from "../utils/notificationContext.jsx"

const LoginPage = (props) => {
    const Navigate = useNavigate()
    const nameRef = useRef()
    const passwordRef = useRef()
        const { showNotification } = useNotification();
     useEffect(()=>{
            window.localStorage.removeItem('JWT')
            window.localStorage.removeItem('user')
        },[])
    function logIn(data){
        console.log(data);
       
        fetch(server+'usersTracking/login',{
            method:"POST",
            headers: {
                "Accept": "*/*",
                "Content-Type": "application/json"
              },
              body:JSON.stringify(data)
        })
        .then((res) => res.json())
        .then((res) => {
          if (res.token) {
            localStorage.setItem("JWT", res.token);
            Navigate("/interventions");
          }
          if(res.err){
            showNotification(res.err)
          

          }
        });
    }
    function getDateFromForm() {
        let data = {
            name: nameRef.current.value,
            password: passwordRef.current.value
        }
        
        return logIn(data)
    }
    return (
        <div className="login__component form">
            <div className="title">CONNEXION</div>
            <div className="input__container">
                <input
                    ref={nameRef}
                    type="text"
                    placeholder="Identifiant"
                    autoComplete="off"
                    name="test"
                />
                <User strokeWidth={2.5} size={28} />
            </div>

            <div className="input__container">
                <input
                    ref={passwordRef}
                    type="text"
                    className='password'
                    placeholder="Mot de Passe"
                    autoComplete="off"
                    name="password"
                />
                <KeySquare  size={28} />
            </div>

            <button onClick={() => getDateFromForm()}>Se Connecter</button>
        </div>
    );
}
export default LoginPage