import Footer from "../../Footer/Footer"
import Navigation from "../../Navigation/Navigation"
import { useState } from "react"
import { useEffect } from "react"
import Axios from "../../../Axios"

function EditerRestaurant() {
 
  //permet d'afficher liste des restaurants sous forme de tableau
    interface Restaurant {
        id: string;
        name: string;
      }

    const [errorMessage, setErrorMessage] = useState("") //Pour les messages d'erreurs
    const [nouveauRestaurant, setNouveauRestaurant] = useState("") // Pour créer un nouveau restaurant
    const [nouvelleAdresse, setNouvelleAdresse] = useState("") 
    const [restaurantList, setRestaurantList] = useState<Restaurant[]>([])
    const [showSuccessAlert, setShowSuccessAlert] = useState(false)

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
        setShowSuccessAlert(true) // Afficher l'alerte de succès
      } catch (error) {
        console.error(error)
        setErrorMessage("Une erreur est survenue lors de la suppression du restaurant.")
      }
    }

    useEffect(() => {
      if (showSuccessAlert) {
        // Masquer la notification après 1 seconde
        const timeoutId = setTimeout(() => {
          setShowSuccessAlert(false)
        }, 1000)
  
        // Nettoyer le timeout lors du démontage du composant ou lorsqu'il y a un changement de valeur pour showSuccessAlert
        return () => clearTimeout(timeoutId)
      }
    }, [showSuccessAlert])
  

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
                  <td className="order-4 px-4 py-2 border border-black b">{restaurant.name}</td>
                  <td className="order-4 px-4 py-2 border border-black b">
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
                  <td className="order-3 px-4 py-2 border border-black b">
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
        {showSuccessAlert && (
          <div className="alert alert-success shadow-lg w-1/2 mx-auto flex justify-center items-center">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Le restaurant a été supprimé avec succès !</span>
            </div>
          </div>
        )}
        <div>
          <p><b>Ajouter un restaurant :</b></p>
          <form onSubmit={(e) => {
            e.preventDefault()
            handleAjouterRestaurant()
          }}>

            <div className="flex flex-col items-center w-full">
              <p className="m-4">Entrez le nom du restaurant</p>
              <input type="text" placeholder="Nom du restaurant" value={nouveauRestaurant} onChange={(e) => setNouveauRestaurant(e.target.value)} className="w-full max-w-xs input bg-gray-50 input-bordered" required/>
              <p className="m-4">Entrez l'adresse du restaurant</p>
              <input type="text" placeholder="Adresse du restaurant" value={nouvelleAdresse} onChange={(e) => setNouvelleAdresse(e.target.value)} className="w-full max-w-xs input bg-gray-50 input-bordered" required/>
              <button type="submit" className="m-8 bg-blue-400 border-blue-400 btn hover:bg-blue-600 btn-active">Valider</button>
              {errorMessage && <p className="text-red-500">{errorMessage}</p>}
              <br /><br />
            </div>         
            <br /><br />
          </form>
        </div>



        <br/><br />
        <Footer />
      </div>
    )
}

export default EditerRestaurant