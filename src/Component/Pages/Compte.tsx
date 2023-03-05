import React, { useState } from "react"
import Navigation from "../navigation/Navigation"
import Footer from "../footer/Footer"

function Compte() {
  const [utilisateur, setUtilisateur] = useState({
    nom: "Doe",
    prenom: "John",
    email: "johndoe@example.com",
  })

  return (
    <div className="profile">
      <Navigation />
      <br />
      <p className="text-4xl md:text-lg">Profil utilisateur</p>     
      <br />
      <p className="text-lg mb-2">
        Nom : <span className="font-bold">{utilisateur.nom}</span>
      </p>
      <p className="text-lg mb-2">
        Prénom : <span className="font-bold">{utilisateur.prenom}</span>
      </p>
      <p className="text-lg mb-2">
        Email : <span className="font-bold">{utilisateur.email}</span>
      </p>
      
      <Footer />
    </div>
  )
}

export default Compte
