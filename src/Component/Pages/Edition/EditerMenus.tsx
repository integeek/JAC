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
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [menuSelections, setMenuSelections] = useState("")
  const [entreeModif, setEntreeModif] = useState("")
  const [platModif, setPlatModif] = useState("")
  const [dessertModif, setDessertModif] = useState("")
  const [descriptionModif, setDescriptionModif] = useState("")
  const [dateModif, setDateModif] = useState("")
  const [restaurantIdModif, setRestaurantIdModif] = useState("")
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)



  useEffect(() => {
    Axios.get("/menus", { responseType: "json" }).then(response => {
      setMenusList(response.data)
    })
  },[])

  const handleShowConfirmationModal = (id : string) => {
    setShowConfirmationModal(true)
    setMenuSelections(id)
  }
  
  const handleEditClick = (id: string) => { //Afficher le modal de modification quand l'icone est cliquée
    setMenuSelections(id)
    setShowModal(true)
  }

  const handleSaveClick = async (): Promise<void> => {
    try {
      if (menuSelections !== null) {
        // Trouver l'entrée de la FAQ correspondante
        const menusToUpdate = menusList.find((menu) => menu.id === menuSelections)
  
        if (menusToUpdate) {
          // Si on a trouvé l'élément à modifier
          const updatedMenus = {
            id: menusToUpdate.id,
            date: dateModif !== "" ? dateModif : menusToUpdate.date, 
            entree: entreeModif !== "" ? entreeModif : menusToUpdate.entree, 
            mainDish: platModif !== "" ? platModif : menusToUpdate.mainDish,
            mainDishDescription: descriptionModif !== "" ? descriptionModif : menusToUpdate.mainDishDescription,
            dessert: dessertModif !== "" ? dessertModif : menusToUpdate.dessert,
            restaurantId: restaurantIdModif !== "" ? restaurantIdModif : menusToUpdate.restaurantId,
          }
  
          // Effectuer la requête PATCH vers l'API pour mettre à jour la FAQ
          const response = await Axios.patch(`/menus/${menuSelections}`, updatedMenus)
  
          // Mettre à jour la liste des FAQ avec les données mises à jour
          const updatedList = menusList.map((menu) =>
            menu.id === menuSelections ? response.data : menu
          )
          setMenusList(updatedList)
          setDateModif("")
          setEntreeModif("")
          setDessertModif("")
          setDescriptionModif("")
          setPlatModif("")
          setRestaurantIdModif("")
          setErrorMessage("") // Réinitialiser le message d'erreur
          setShowModal(false) // Masquer le modal
        }
      }
    } catch (error) {
      console.log(error)
      const errorMessage =
        "Une erreur s'est produite lors de la sauvegarde. Veuillez réessayer."
      setErrorMessage(errorMessage)
      setShowSuccessAlert(false)
  
      // Masquer le message d'erreur après 2 secondes
      setTimeout(() => {
        setErrorMessage("")
      }, 2000)
    }
  }

  const handleDeleteMenus = async (): Promise<void> => {
    try {
      await Axios.delete(`/menus/${menuSelections}`)
      // Mettre à jour la liste des menus après la suppression
      const response = await Axios.get("/menus")
      setMenusList(response.data)
      setErrorMessage("")
      setShowSuccessAlert(true) // Afficher l'alerte de succès
      setShowConfirmationModal(false)
    } catch (error) {
      console.log(error)
      const errorMessage =
        "Une erreur s'est produite lors de l'envoi du formulaire. Veuillez réessayer."
      setErrorMessage(errorMessage)
      setShowSuccessAlert(false)
  
      // Masquer le message d'erreur après 2 secondes
      setTimeout(() => {
        setErrorMessage("")
      }, 2000)
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
      .catch((error) => {
        console.log(error)
        setErrorMessage(
          "Une erreur s'est produite lors de l'envoi du formulaire. Veuillez réessayer."
        )
        setShowSuccessAlert(false)
      
        // Masquer le message d'erreur après 2 secondes
        setTimeout(() => {
          setErrorMessage("")
        }, 2000)
      })
  }

  useEffect(() => {
    if (showSuccessAlert) {
      // Masquer la notification après 1 seconde
      const timeoutId = setTimeout(() => {
        setShowSuccessAlert(false)
      }, 2000)

      // Nettoyer le timeout lors du démontage du composant ou lorsqu'il y a un changement de valeur pour showSuccessAlert
      return () => clearTimeout(timeoutId)
    }
  }, [showSuccessAlert])

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
                  <button onClick={() => handleShowConfirmationModal(menu.id)} className="btn btn-ghost btn-circle">
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
                  <button onClick={() => handleEditClick(menu.id)} className="btn btn-ghost btn-circle">
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
      {showModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-blue-100 rounded-full sm:mx-0 sm:h-10 sm:w-10 focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <p className="text-sm text-gray-500">Laisser vide pour conserver la valeur précédente.</p>
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Editer la date du menu</h3>
                    <div className="mt-2">
                      <input type="text" placeholder="Nouvelle date" className="w-full max-w-xs input bg-gray-50 input-bordered" value={dateModif}
                        onChange={(e) => setDateModif(e.target.value)}/>
                    </div>
                    <h3 className="mt-6 text-lg font-medium leading-6 text-gray-900">Editer l'entrée du menu</h3>
                    <div className="mt-2">
                      <input type="text" placeholder="Nouvelle entrée" className="w-full max-w-xs input bg-gray-50 input-bordered" value={entreeModif}
                        onChange={(e) => setEntreeModif(e.target.value)} />
                    </div>
                    <h3 className="mt-6 text-lg font-medium leading-6 text-gray-900">Editer le plat du menus</h3>
                    <div className="mt-2">
                      <input type="text" placeholder="Nouveau plat" className="w-full max-w-xs input bg-gray-50 input-bordered" value={platModif}
                        onChange={(e) => setPlatModif(e.target.value)} />
                    </div>
                    <h3 className="mt-6 text-lg font-medium leading-6 text-gray-900">Editer la description du plat</h3>
                    <div className="mt-2">
                      <input type="text" placeholder="Nouvelle description" className="w-full max-w-xs input bg-gray-50 input-bordered" value={descriptionModif}
                        onChange={(e) => setDescriptionModif(e.target.value)} />
                    </div>
                    <h3 className="mt-6 text-lg font-medium leading-6 text-gray-900">Editer le dessert du menu</h3>
                    <div className="mt-2">
                      <input type="text" placeholder="Nouveau dessert" className="w-full max-w-xs input bg-gray-50 input-bordered" value={dessertModif}
                        onChange={(e) => setDessertModif(e.target.value)} />
                    </div>
                    <h3 className="mt-6 text-lg font-medium leading-6 text-gray-900">Editer l'Id du restaurant</h3>
                    <div className="mt-2">
                      <input type="text" placeholder="Nouvel id" className="w-full max-w-xs input bg-gray-50 input-bordered" value={restaurantIdModif}
                        onChange={(e) => setNouveaurestaurantId(e.target.value)} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
                <button className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-blue-400 border border-transparent rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm" onClick={handleSaveClick}>
            Sauvegarder
                </button>
                <button className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={() => setShowModal(false)}>
            Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showConfirmationModal && (
        <div id="deleteModal" tabIndex={-1} aria-hidden="true" className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="relative w-full max-w-md p-4">
            <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
              <button  onClick={() => setShowConfirmationModal(false)} type="button" className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="deleteModal">
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                <span className="sr-only">Close modal</span>
              </button>
              <svg className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
              <p className="mb-4 text-gray-500 dark:text-gray-300">Etes vous sûr de vouloir supprimer ce menu ? </p>
              <div className="flex items-center justify-center space-x-4">
                <button  onClick={() => setShowConfirmationModal(false)} data-modal-toggle="deleteModal" type="button" className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
          Annuler
                </button>
                <button  onClick={handleDeleteMenus} type="submit" className="px-3 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">
          Supprimer
                </button>
              </div>
            </div>
          </div>
        </div>

      )}

      {showSuccessAlert && (
        <div className="flex items-center justify-center w-1/2 mx-auto shadow-lg alert alert-success">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Le menus a été supprimé avec succès !</span>
          </div>
        </div>
      )}
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
          </div>         
        </form>
      </div>
      <Footer />
      {errorMessage && (
        <div className="flex items-center justify-center w-1/2 mx-auto transition-opacity duration-500 shadow-lg alert alert-error">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{errorMessage}</span>
          </div>
        </div>
      )}
      <br /><br /><br /><br /><br />
    </div>
  )
}

export default EditerMenus