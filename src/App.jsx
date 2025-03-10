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

function App() {
 const [dialogNotificationState,SetDialogNotificationState]= useState(false)
 const [dialogNotificationContent,SetDialogNotificationContent]= useState("")
 const [btnContent,SetBtnContent]= useState("ok")
 const location = useLocation()
 const [navBarState,setNavbarState]=useState(false)
  return (
    <NotificationProvider>
    {location.pathname!=="/"&&<NavComponent />}
            <div className="background"></div>
            <div className="main">
                <NotificationModal />
                <section className="content">
                    <Routes>
                        <Route path="/" element={<LoginPage />} />
                        <Route path="/interventions" element={<HomePage />} />
                        <Route path="/createintervention" element={<CreateInterventionPage />} />
                        <Route path="/NouveauClient" element={<NewClientPage />} />
                        <Route path="/intervention/:id" element={<InterventionPage />} />
                    </Routes>
                </section>
            </div>
        </NotificationProvider>
  
  );
}

export default App;
