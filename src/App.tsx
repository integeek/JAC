import "./App.css"
import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Route, Routes} from "react-router-dom"
import Faq from "./Component/Pages/Faq"
import Contact from "./Component/Pages/Contact"
import Reserver from "./Component/Pages/Reserver"
import MesReservations from "./Component/Pages/MesReservations"
import Mentions from "./Component/Pages/MentionLegale"
import Compte from "./Component/Pages/Authentification/Compte/Compte"
import Connexion from "./Component/Pages/Authentification/Connexion"
import Inscription from "./Component/Pages/Authentification/Inscription"
import Menu1 from "./Component/Pages/Menus/Menu1"
import Accueil from "./Component/Pages/Accueil"
import NouveauMdp from "./Component/Pages/Authentification/NouveauMdp"
import Erreur404 from "./Component/Pages/Erreur404" 
import MdpOublie from "./Component/Pages/Authentification/MdpOublie"
import EditerFaq from "./Component/Pages/Edition/EditerFaq"
import EditerMenus from "./Component/Pages/Edition/EditerMenus"
import EditerUser from "./Component/Pages/Edition/EditerUser"
import EditerRestaurant from "./Component/Pages/Edition/EditerRestaurant"
import ReservationRestaurateur from "./Component/Pages/ReservationRestaurateur"
import ConfirmationEmail from "./Component/Pages/Authentification/ConfirmationEmail"
import EditerContact from "./Component/Pages/Edition/EditerContact"
import EditerCompte from "./Component/Pages/Authentification/Compte/EditerCompte"
// relier les différentes pages avec l'url
function App() {
  return (
    <div className ="App">
      <link rel="shortcut icon" type="image/png" href="https://www.lad.fr/sites/default/files/LOGO_LAD_favicon.png" title="Logo Les ailes déployées"/>
      <BrowserRouter> 
        <Routes>
          <Route path="/" element={<Accueil />} />  
          <Route path="/accueil" element={<Accueil />} />  
          <Route path="/faq" element={<Faq />} />  
          <Route path="/contact" element={<Contact />} />  
          <Route path="/reserver" element={<Reserver />} />     
          <Route path="/reservation" element={<MesReservations />} />  
          <Route path="/mentions" element={<Mentions />} />  
          <Route path="/compte" element={<Compte />} />  
          <Route path="/connexion" element={<Connexion />} />  
          <Route path="/inscription" element={<Inscription />} />  
          <Route path="/mdpoublie" element={<MdpOublie />} />  
          <Route path="/nouveaumdp" element={<NouveauMdp />} />  
          <Route path="/menu1" element={<Menu1 />} />  
          <Route path="*" element={<Erreur404 />} />  
          <Route path="/editfaq" element={<EditerFaq />} />  
          <Route path="/editmenus" element={<EditerMenus />} />  
          <Route path="/edituser" element={<EditerUser />} />  
          <Route path="/editrestaurant" element={<EditerRestaurant />} />  
          <Route path="/reservationrestaurateur" element={<ReservationRestaurateur />} />
          <Route path="/confirmation" element={<ConfirmationEmail />} />
          <Route path="/editcontact" element={<EditerContact />} />
          <Route path="/editcompte" element={<EditerCompte />} />

        </Routes>
      </BrowserRouter>
    </div>
  )
}

// faire le lien avec la page index.html
ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById("root")
)
export default App