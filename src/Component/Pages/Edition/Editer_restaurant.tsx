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

    const [restaurant, setRestaurant] = useState<Restaurant[]>([]) //Pour afficher les restaurants
    const [errorMessage, setErrorMessage] = useState("") //Pour les messages d'erreurs
    const [nouveauRestaurant, setNouveauRestaurant] = useState("") // Pour créer un nouveau restaurant
    const [actionSelectionnee, setActionSelectionnee] = useState("") // Pour choisir quelle action à effectuer
    const [restaurantAModifier, setRestaurantAModifier] = useState<{id: string, name: string}>({id: "", name: ""}) //Pour modifier les restaurants



    // Récuperer les données des restaurants dans la BDD
    useEffect(() => {
      Axios.get("/restaurant", { responseType: "json" }).then(response => {
        setRestaurant(response.data)
      })
    }, []) 
    
    const handleActionSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setActionSelectionnee(event.target.value)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
      e.preventDefault()

      //Empecher de mettre un nom de restaurant vide
      if (!nouveauRestaurant.trim()) {
        setErrorMessage("Le nom du restaurant ne peut pas être vide.")
        return
      } 
      // Mettre un nouveau restaurant
      try{
        const response = await Axios.post("/restaurant", {
          name: nouveauRestaurant,
        })
        console.log(response.data)
        setNouveauRestaurant("")
        setErrorMessage("")
      } catch (error) {
        console.error(error)
        setErrorMessage("Une erreur est survenue lors de l'ajout du restaurant.")
      }
    }
    // Supprimer un restaurant
    const handleDeleteRestaurant = async (id: string): Promise<void> => {
      try {
        await Axios.delete(`/restaurant/${id}`)
        // Mettre à jour la liste des restaurants après la suppression
        const response = await Axios.get("/restaurant")
        setRestaurant(response.data)
        setErrorMessage("")
      } catch (error) {
        console.error(error)
        setErrorMessage("Une erreur est survenue lors de la suppression du restaurant.")
      }
    }
    
    const handleModificationNomRestaurant = (restaurant: Restaurant) => {
      setRestaurantAModifier({id: restaurant.id, name: restaurant.name})
    }
  
    // ... --> copier toutes les propriétés en remplaçant juste le name
    const handleNouveauNomRestaurant = (e: React.ChangeEvent<HTMLInputElement>) => {
      setRestaurantAModifier({...restaurantAModifier, name: e.target.value})
    }
    
    const handleSubmitModificationNom = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
      e.preventDefault()
      try{
  
        const response = await Axios.put(`/restaurant/${restaurantAModifier?.id}`, {
          name: restaurantAModifier?.name,
        })
        console.log(response.data)
        setRestaurantAModifier(undefined)
        setErrorMessage("")
      } catch (error) {
        console.error(error)
        setErrorMessage("Une erreur est survenue lors de la modification du nom du restaurant.")
      }
    }
    const handleNouveauRestaurantNom = (e: React.ChangeEvent<HTMLInputElement>) => {
      setNouveauRestaurant(e.target.value)
    }
    return (
      <div>
        <title>Editer les restaurants</title>
        <Navigation />
        <div className="center">
          <table className="mx-auto my-8"> 
            <thead>
              <tr>
                <th className="px-4 py-2">Les restaurants</th>
                <th className="px-4 py-2">Supprimer</th>
                <th className="px-4 py-2">Modifier</th>
              </tr>
            </thead>
            <tbody>
              {restaurant.map(restaurant => (
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
                  <td className="border b border-black order-4 px-4 py-2"><button onClick={() => handleModificationNomRestaurant(restaurant)}>Modifier</button></td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
        <p>Choisissez ce que vous voulez faire avec les restaurants</p>
        <br />
        <select className="select w-full max-w-xs bg-base-100 shadow-xl" onChange={handleActionSelection}>
          <option disabled selected>Choisissez votre action</option>
          <option>Ajouter un restaurant</option>
          <option>Supprimer un restaurant</option>
        </select>   

        
        {actionSelectionnee === "Ajouter un restaurant" && (
          <div>
            <form onSubmit={handleSubmit}>
              <div className="w-full flex flex-col items-center">
                <p className="m-4">Entrez le nom du restaurant</p>
                <input type="text" placeholder="Nom du restaurant" value={nouveauRestaurant} onChange={handleNouveauRestaurantNom} className="input bg-gray-50 input-bordered w-full max-w-xs" required/>
                <button type="submit" className="btn bg-blue-400 hover:bg-blue-600 border-blue-400 m-8 btn-active">Valider</button>
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                <br /><br />
              </div>         
              <br /><br />
            </form>
          </div>
        )}

        {restaurantAModifier.id && (
          <div>
            <form onSubmit={handleSubmitModificationNom}>
              <div className="w-full flex flex-col items-center">
                <p className="m-4">Entrez le nouveau nom du restaurant</p>
                <input type="text" placeholder="Nouveau nom du restaurant" value={restaurantAModifier.name} onChange={handleNouveauNomRestaurant} className="input bg-gray-50 input-bordered w-full max-w-xs"/>
                <button type="submit" className="btn bg-blue-400 hover:bg-blue-600 border-blue-400 m-8 btn-active">Valider</button>
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                <br /><br />
              </div>
              <br /><br />
            </form>
          </div>
        )}

        <Footer />
      </div>
    )
}

export default Editer_restaurant