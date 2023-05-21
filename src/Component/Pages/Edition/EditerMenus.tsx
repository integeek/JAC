import Footer from "../../Footer/Footer"
import Navigation from "../../Navigation/Navigation"
import { useState } from "react"
import { useEffect } from "react"
import Axios from "../../../Axios"

function EditerMenus() {

  interface Menus {
    id : string,
    date: Date;
    entree: string;
    mainDish: string;
    mainDishDescription: string;
    dessert: string;
    restaurantId: number;
 }

  const [menusList, setMenusList] = useState<Menus[]>([])
  const [errorMessage, setErrorMessage] = useState("") //Pour les messages d'erreurs
  const [nouvelleEntree, setNouvelleEntree] = useState("") // Pour créer un nouveau restaurant
  const [nouveauPlat, setNouveauPlat] = useState("") // Pour créer un nouveau restaurant
  const [nouveauDessert, setNouveauDessert] = useState("") // Pour créer un nouveau restaurant
  const [nouvelleDescription, setNouvelleDescription] = useState("") // Pour créer un nouveau restaurant
  const [nouveauRestaurantId, setNouveaurestaurantId] = useState("") // Pour créer un nouveau restaurant
  const [nouvelleDate, setNouvelleDate] = useState("") // Pour créer un nouveau restaurant


  useEffect(() => {
    Axios.get("/menus", { responseType: "json" }).then(response => {
      setMenusList(response.data)
    })
  },[])

  const handleDeleteMenus = async (id: string): Promise<void> => {
    try {
      await Axios.delete(`/menus/${id}`)
      // Mettre à jour la liste des menus après la suppression
      const response = await Axios.get("/menus")
      setMenusList(response.data)
      setErrorMessage("")
    } catch (error) {
      console.error(error)
      setErrorMessage("Une erreur est survenue lors de la suppression de la question.")
    }
  }

  const handleAjouterMenus = () => {
    // Vérifier si la question et la réponse sont remplies
    if (nouveauDessert.trim() === "" || nouveauPlat.trim() === "" || nouveauRestaurantId.trim() === "" || nouvelleDate.trim() === "" || nouvelleDescription.trim() === "" || nouvelleEntree.trim() === "") {
      setErrorMessage("Veuillez remplir tous les champs.")
      return
    }
    // Envoyer la requête POST pour ajouter la nouvelle question
    Axios.post("/menus", {
      date: nouvelleDate,
      entree: nouvelleEntree,
      mainDish: nouveauPlat,
      mainDishDescription: nouvelleDescription,
      dessert: nouveauDessert,
      restaurantId: nouveauRestaurantId,
    })
      .then((response) => {
        // Mettre à jour l'état faqList avec la nouvelle question
        setMenusList([...menusList, response.data])

        setNouvelleDate("2023-03-20T23:00:00.000Z")
        setNouvelleEntree("")
        setNouveauPlat("")
        setNouvelleDescription("")
        setNouveauDessert("")
        setNouveaurestaurantId("1")
      })
      .catch(() => {
        setErrorMessage("Une erreur s'est produite.")
      })
  }

  return (
    <div>
      <title>Editer les menus</title>
      <Navigation />
      <div className="center">
        <table className="min-h-full mx-auto my-8 shadow-md"> 
          <thead>
            <tr>
              <th className="px-4 py-2">Les menus</th>
              <th className="px-4 py-2">Supprimer</th>
              <th className="px-4 py-2">Modifier</th>
            </tr>
          </thead>
          <tbody>
            {menusList.map(menu => (
              <tr key={menu.id}>
                <td className="order-4 px-4 py-2 border border-black b">{menu.mainDish}</td>
                <td className="order-4 px-4 py-2 border border-black b">
                  <button onClick={() => handleDeleteMenus(menu.id)} className="btn btn-ghost btn-circle">
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
      <div>
        <p><b>Ajouter un menus :</b></p>
        <form onSubmit={(e) => {
          e.preventDefault()
          handleAjouterMenus()
        }}>
          <div className="flex flex-col items-center w-full">
            <p className="m-4">Entrez la date</p>
            <input type="text" placeholder="Date du jour" className="w-full max-w-xs input bg-gray-50 input-bordered" value={nouvelleDate} onChange={(e) => setNouvelleDate(e.target.value)}required/>
            <p className="m-4">Entrez le nom de l'entrée</p>
            <input type="text" placeholder="Nom de l'entrée" className="w-full max-w-xs input bg-gray-50 input-bordered" value={nouvelleEntree} onChange={(e) => setNouvelleEntree(e.target.value)} required/>
            <p className="m-4">Entrez le nom du plat </p>
            <input type="text" placeholder="Nom du plat" className="w-full max-w-xs input bg-gray-50 input-bordered" value={nouveauPlat} onChange={(e) => setNouveauPlat(e.target.value)} required/>
            <p className="m-4">Entrez la description du plat</p>
            <input type="text" placeholder="Description du plat" className="w-full max-w-xs input bg-gray-50 input-bordered" value={nouvelleDescription} onChange={(e) => setNouvelleDescription(e.target.value)} required/>
            <p className="m-4">Entrez le nom du dessert</p>
            <input type="text" placeholder="Nom du dessert" className="w-full max-w-xs input bg-gray-50 input-bordered" value={nouveauDessert} onChange={(e) => setNouveauDessert(e.target.value)} required/>
            <p className="m-4">Entrez le numéro du restaurant</p>
            <input type="text" placeholder="Numéro du restaurant" className="w-full max-w-xs input bg-gray-50 input-bordered" value={nouveauRestaurantId} onChange={(e) => setNouveaurestaurantId(e.target.value)} required/>
            <input type="file" className="w-full max-w-xs mt-6 file-input file-input-bordered file-input-info" />
            <button type="submit" className="m-8 bg-blue-400 border-blue-400 btn hover:bg-blue-600 btn-active">Valider</button>
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

export default EditerMenus