import Footer from "../../Footer/Footer"
import Navigation from "../../Navigation/Navigation"
import { useState } from "react"
import { useEffect } from "react"
import Axios from "../../../Axios"

function Editer_restaurant() {
 
  //permet d'afficher liste des restaurants sous forme de tableau
    interface Restaurant {
        id: string;
        name: string;
      }

    const [errorMessage, setErrorMessage] = useState("") //Pour les messages d'erreurs
    const [nouveauRestaurant, setNouveauRestaurant] = useState("") // Pour créer un nouveau restaurant
    const [nouvelleAdresse, setNouvelleAdresse] = useState("") 
    const [restaurantList, setRestaurantList] = useState<Restaurant[]>([])

    // Récuperer les données des restaurants dans la BDD
    useEffect(() => {
      Axios.get("/restaurant", { responseType: "json" }).then(response => {
        setRestaurantList(response.data)
      })
    }, []) 
    
    const handleAjouterRestaurant = () => {
      // Vérifier si le nom et l'adresse sont remplies
      if (nouvelleAdresse.trim() === "" || nouveauRestaurant.trim() === "") {
        setErrorMessage("Veuillez remplir tous les champs.")
        return
      }
      
      // Envoyer la requête POST pour ajouter la nouvelle question
      Axios.post("/restaurant", {
        name: nouveauRestaurant,
        address: nouvelleAdresse,
      })
        .then((response) => {
          // Mettre à jour l'état faqList avec la nouvelle question
          setRestaurantList([...restaurantList, response.data])
        
          // Réinitialiser les états pour la nouvelle question et sa réponse
          setNouveauRestaurant("")
          setNouvelleAdresse("")
        })
        .catch(() => {
          setErrorMessage("Une erreur s'est produite.")
        })
    }
    
    // Supprimer un restaurant
    const handleDeleteRestaurant = async (id: string): Promise<void> => {
      try {
        await Axios.delete(`/restaurant/${id}`)
        // Mettre à jour la liste des restaurants après la suppression
        const response = await Axios.get("/restaurant")
        setRestaurantList(response.data)
        setErrorMessage("")
      } catch (error) {
        console.error(error)
        setErrorMessage("Une erreur est survenue lors de la suppression du restaurant.")
      }
    }

    return (
      <div>
        <title>Editer les restaurants</title>
        <Navigation />
        <div className="center">
          <table className="mx-auto my-8 shadow-md"> 
            <thead>
              <tr>
                <th className="px-4 py-2">Les restaurants</th>
                <th className="px-4 py-2">Supprimer</th>
                <th className="px-4 py-2">Modifier</th>
              </tr>
            </thead>
            <tbody>
              {restaurantList.map((restaurant) => (
                <tr key={restaurant.id}>
                  <td className="border b border-black order-4 px-4 py-2">{restaurant.name}</td>
                  <td className="border b border-black order-4 px-4 py-2">
                    <button onClick={() => handleDeleteRestaurant(restaurant.id)} className="btn btn-ghost btn-circle">
                      <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ff5722" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <line x1="4" y1="7" x2="20" y2="7" />
                        <line x1="10" y1="11" x2="10" y2="17" />
                        <line x1="14" y1="11" x2="14" y2="17" />
                        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                      </svg>
                    </button>
                  </td>
                  <td className="border b border-black order-3 px-4 py-2">
                    <button className="btn btn-ghost btn-circle">
                      <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-edit" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                        <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
                        <line x1="16" y1="5" x2="19" y2="8" />
                      </svg>
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <p><b>Ajouter un restaurant :</b></p>
          <form onSubmit={(e) => {
            e.preventDefault()
            handleAjouterRestaurant()
          }}>
            <div className="w-full flex flex-col items-center">
              <p className="m-4">Entrez le nom du restaurant</p>
              <input type="text" placeholder="Nom du restaurant" value={nouveauRestaurant} onChange={(e) => setNouveauRestaurant(e.target.value)} className="input bg-gray-50 input-bordered w-full max-w-xs" required/>
              <p className="m-4">Entrez l'adresse du restaurant</p>
              <input type="text" placeholder="Adresse du restaurant" value={nouvelleAdresse} onChange={(e) => setNouvelleAdresse(e.target.value)} className="input bg-gray-50 input-bordered w-full max-w-xs" required/>
              <button type="submit" className="btn bg-blue-400 hover:bg-blue-600 border-blue-400 m-8 btn-active">Valider</button>
              {errorMessage && <p className="text-red-500">{errorMessage}</p>}
              <br /><br />
            </div>         
            <br /><br />
          </form>
        </div>
      
        <Footer />
      </div>
    )
}

export default Editer_restaurant