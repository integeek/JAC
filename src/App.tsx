import "./App.css"
import Home from "./Component/Home"
import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Route, Routes} from "react-router-dom"
import Faq from "./Component/Pages/Faq"
import Contact from "./Component/Pages/Contact"
import Reserver from "./Component/Pages/Reserver"
import Mes_reservations from "./Component/Pages/Mes_reservations"
import Mentions from "./Component/Pages/mentions"
import Compte from "./Component/Pages/Compte"
import Connexion from "./Component/Pages/Connexion"
import Inscription from "./Component/Pages/Inscription"
import Acceuil from "./Component/Pages/Accueil"
import Mdp_oublie from "./Component/Pages/mdp_oublie"
import New_mdp from "./Component/Pages/New_mdp"

// relier les différentes pages avec l'url
function App() {
  return (
    <div className ="App">
      <link rel="shortcut icon" type="image/png" href="https://www.lad.fr/sites/default/files/LOGO_LAD_favicon.png"/>
      <BrowserRouter> 
        <Routes>
          <Route path="/" element={<Home />} />     
          <Route path="/faq" element={<Faq />} />  
          <Route path="/contact" element={<Contact />} />  
          <Route path="/reserver" element={<Reserver />} />     
          <Route path="/reservation" element={<Mes_reservations />} />  
          <Route path="/mentions" element={<Mentions />} />  
          <Route path="/compte" element={<Compte />} />  
          <Route path="/connexion" element={<Connexion />} />  
          <Route path="/inscription" element={<Inscription />} />  
          <Route path="/acceuil" element={<Acceuil />} />  
          <Route path="/mdpoublie" element={<Mdp_oublie />} />  
          <Route path="/nouveaumdp" element={<New_mdp />} />  
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