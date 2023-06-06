import React, { useState, FormEvent } from "react"
import Navigation from "../../../Navigation/Navigation"
import Footer from "../../../Footer/Footer"
import Axios from "../../../../Axios"
import { Link } from "react-router-dom"

function EditerCompte() {
  const [nom, setNom] = useState("")
  const [prenom, setPrenom] = useState("")
  const [email, setEmail] = useState("")
  const [mdp, setMdp] = useState("")
  const [ancienMdp, setAncienMdp] = useState("")


  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    Axios
      .put("/user", { nom, prenom, email })
      .then((response) => {
        console.log("Mise à jour réussie", response.data)
      })
      .catch((error) => {
        console.log("Erreur lors de la mise à jour", error)
        // Gérer l'erreur de mise à jour du compte, par exemple afficher un message d'erreur
      })
    setNom("")
    setPrenom("")
    setEmail("")
    setMdp("")
  }

  return (
    <div>
      <Navigation />
      <title>Editer mon compte</title>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-center w-full">
          <p className="m-4">Entrez votre nom</p>
          <input type="text" placeholder="Votre nom" className="w-full max-w-xs input bg-gray-50 input-bordered" value={nom} onChange={(event) => setNom(event.target.value)}/>
         
          <p className="m-4">Entrez votre prenom</p>
          <input type="text" placeholder="Votre prénom" className="w-full max-w-xs input bg-gray-50 input-bordered" value={prenom} onChange={(event) => setPrenom(event.target.value)}/>
          
          <p className="m-4">Entrez votre email</p>
          <input type="text" placeholder="Votre email" className="w-full max-w-xs input bg-gray-50 input-bordered" value={email} onChange={(event) => setEmail(event.target.value)}/>
          
          <p className="m-4">Entrez votre nouveau mot de passe </p>
          <input type="text" placeholder="Votre nouveau mot de passe" className="w-full max-w-xs input bg-gray-50 input-bordered" value={mdp} onChange={(event) => setMdp(event.target.value)}/>
         
          <p className="m-4">Entrez votre ancien mot de passe </p>
          <input type="text" placeholder="Votre ancien mot de passe" className="w-full max-w-xs input bg-gray-50 input-bordered" value={ancienMdp} onChange={(event) => setAncienMdp(event.target.value)}/>

          <button type="submit" className="m-8 bg-blue-400 border-blue-400 btn hover:bg-blue-600 btn-active">Enregistrer</button>  
        </div>         
      </form>

      <div className="flex justify-center">
        <Link to="/compte" className="mb-16  bg-blue-400 border-blue-400 btn hover:bg-blue-600 btn-active text-white">
          Retourner à la page de compte
        </Link>
      </div>
      

      <Footer />
    </div>
  )
}

export default EditerCompte
