import { Routes, Route, useNavigate, useSearchParams, useLocation } from "react-router-dom";
import LoginPage from "./pages/login";
import { useEffect, useState } from "react";
import NavComponent from "./components/nav";
import { NotificationProvider, useNotification } from "./utils/notificationContext.jsx";
import HomePage from "./pages/home";
import NewClientPage from "./pages/createClient";
import InterventionPage from "./pages/intervention";
import NotificationModal from "./components/notificationModal";
import CreateInterventionPage from "./pages/CreateIntervention.jsx";
import ClosedInterventions from "./pages/closedInterventions.jsx";
import TransfersList from "./pages/transferslist.jsx";
import TransferTicket from "./pages/tansfer.jsx";
import SelectModal from "./components/selectModal.jsx";
import { SelectProvider } from './utils/selectContext';
import AccountManagementPage from "./pages/AccountManagementPage.jsx";
function App() {
    const [dialogNotificationState, SetDialogNotificationState] = useState(false)
    const [dialogNotificationContent, SetDialogNotificationContent] = useState("")
    const [btnContent, SetBtnContent] = useState("ok")
    const location = useLocation()
    const [navBarState, setNavbarState] = useState(false)
    const Navigate = useNavigate() 
    useEffect(()=>{
        if(!window.localStorage.getItem("JWT")){
            Navigate("/")
        }else{
            let token = window.localStorage.getItem("JWT")
            fetch("https://back-material-ag.vercel.app/usersTracking/auth",{
           method: "POST",
           headers: {
               "Accept": "*/*",
               "Content-Type": "application/json",
           },
           body: JSON.stringify({token:token})
      
        })
        .then(res=>res.json())
        .then(res=>{
            window.localStorage.removeItem('user')
            window.localStorage.setItem("user",JSON.stringify(res))

            }
        )
        
    }
        
    },[window.location.pathname])
    return (
        <NotificationProvider>
            <SelectProvider>
                {location.pathname !== "/" && <NavComponent />}
                <div className="background"></div>
                <div className="main">
                    <NotificationModal />
                    <SelectModal />
                    <section className="content">
                        <Routes>
                            <Route path="/" element={<LoginPage />} />
                            <Route path="/accountManagement" element={<AccountManagementPage />} />
                            <Route path="/interventions" element={<HomePage />} />
                            <Route path="/interventionsEnd" element={<ClosedInterventions />} />
                            <Route path="/createintervention" element={<CreateInterventionPage />} />
                            <Route path="/intervention/:id" element={<InterventionPage />} />
                            <Route path="/TransfersList" element={<TransfersList />} />
                            <Route path="/TransferTicket/:id" element={<TransferTicket />} />
                        </Routes>
                    </section>
                </div>
                </SelectProvider>
        </NotificationProvider>

    );
}

export default App;
