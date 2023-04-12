import Navigation from "../Navigation/Navigation"
import Footer from "../Footer/Footer"
import { useEffect, useState } from "react"
import Axios from "../../Axios"

function Editer() {

  interface Restaurant {
    id: string;
    name: string;
    // autres propriétés du restaurant
  }
  
  const [pageSelectionnee, setPageSelectionnee] = useState("")
  const [actionSelectionnee, setActionSelectionnee] = useState("")
  const [question, setQuestion] = useState("")
  const [reponse, setReponse] = useState("")
  const [restaurant, setRestaurant] = useState<Restaurant[]>([])


  const handlePageSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSelectionnee(event.target.value)
    setActionSelectionnee("")
  }
  
  const handleActionSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setActionSelectionnee(event.target.value)
  }
  const handleAjouterQuestion = () => {
    const newQuestion = {
      question: question,
      reponse: reponse,
    }
  
    Axios.post("http://localhost:8000/faq", newQuestion)
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  
    
  useEffect(() => {
    Axios.get("/restaurant", { responseType: "json" }).then(response => {
      setRestaurant(response.data)
    })
  }, []) 

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
          {actionSelectionnee === "Ajouter une question" && ( //probleme au niveau des contours des zones de texte
            <div className="flex justify-center items-center">
              <div className="w-full flex flex-col items-center">
                <p className="m-4">Entrez votre question</p>
                <input type="text" placeholder="Votre question" className="input bg-gray-50 input-bordered w-full max-w-xs" value={question} onChange={(e) => setQuestion(e.target.value)} />
                <p className="m-4">Entrez la réponse</p>
                <textarea id="message" rows={4} className="block p-2.5 w-full max-w-xs text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300" placeholder="La réponse" value={reponse.toString()}></textarea>
                <button className="btn bg-blue-400 hover:bg-blue-600 border-blue-400 m-8 btn-active">Valider</button>
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
          <div className="center">
            <table className="mx-auto my-8">
              <thead>
                <tr>
                  <th className="px-4 py-2">Les restaurants</th>
                </tr>
              </thead>
              <tbody>
                {restaurant.map(restaurant => (
                  <tr key={restaurant.id}>
                    <td className="border b border-black order-4 px-4 py-2">{restaurant.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>

          <br />
          <p>Choisissez ce que vous voulez faire avec les restaurants</p>
          <br />
          <select className="select w-full max-w-xs bg-base-100 shadow-xl" onChange={handleActionSelection}>
            <option disabled selected>Choisissez votre action</option>
            <option>Ajouter un restaurant</option>
            <option>Supprimer un restaurant</option>
            <option>Modifier un restaurant</option>
          </select>

          {actionSelectionnee === "Ajouter un restaurant" && (
            <div>
              <p>Ajouter un restaurant</p>
            </div>
          )}

          {actionSelectionnee === "Supprimer un restaurant" && (
            <div>
              <p>Supprimer un restaurant</p>
            </div>
          )}

          {actionSelectionnee === "Modifier un restaurant" && (
            <div>
              <p>Modification d'un restaurant</p>
            </div>
          )}
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