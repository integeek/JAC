import Navigation from "../Navigation/Navigation"
import Footer from "../Footer/Footer"
import { useState } from "react"

function Editer() {

  
  const [pageSelectionnee, setPageSelectionnee] = useState("")
  const [actionSelectionnee, setActionSelectionnee] = useState("")

  const handlePageSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSelectionnee(event.target.value)
    setActionSelectionnee("")
  }

  const handleActionSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setActionSelectionnee(event.target.value)
  }

  return (
    <div>
      <Navigation />
      <br />
      <title>Editer</title>
      <p className="text-4xl md:text-lg">Page d'édition du site</p>
      <br /><br />
      <select className="select w-full max-w-xs bg-base-100 shadow-xl" onChange={handlePageSelection}>
        <option disabled selected>Choisissez quelle page éditer </option>
        <option>Les menus</option>
        <option>La Faq</option>
        <option>Les restaurants</option>
        <option>Les utilisateurs</option>
      </select>
      <br />

      {pageSelectionnee === "La Faq" && (
        <div>
          <br />
          <p>Choisissez ce que vous voulez faire avec la Faq</p>
          <br />
          <select className="select w-full max-w-xs bg-base-100 shadow-xl" onChange={handleActionSelection}>
            <option disabled selected>Choisissez votre action</option>
            <option>Ajouter une question</option>
            <option>Modifier une question</option>
            <option>Supprimer une question</option>
          </select>
          {actionSelectionnee === "Ajouter une question" && (
            <div>
              <br />
              <div className="flex justify-center items-center">
                <div>
                  <p>Entrez votre question</p>
                  <input type="text" placeholder="Votre question" className="input input-bordered w-full max-w-xs" />
                  <p>Entrez la réponse</p>
                  <textarea id="message" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="La réponse"></textarea>
                </div>
              </div>


            </div>

              
          )}

          {actionSelectionnee === "Modifier une question" && (
            <div>
              <p>Modification d'une question</p>
            </div>
          )}
          {actionSelectionnee === "Supprimer une question" && (
            <div>
              <p>Suppression d'une question</p>
            </div>
          )}
        </div>
      )}


      {pageSelectionnee === "Les menus" &&
        <div>
          <p>Test des menus</p>
        </div>
      }

      {pageSelectionnee === "Les restaurants" &&
        <div>
          <p>Test des restaurants</p>
        </div>
      }

      {pageSelectionnee === "Les utilisateurs" &&
        <div>
          <p>Test des users</p>
        </div>
      }

      <Footer /> 
    </div>
  )
}
  
export default Editer
