import Footer from "../../Footer/Footer"
import Navigation from "../../Navigation/Navigation"
import { useState } from "react"
import { useEffect } from "react"
import Axios from "../../../Axios"
import HelpIcon from "@mui/icons-material/Help"

function EditerRestaurant() {
 
  //permet d'afficher liste des restaurants sous forme de tableau
  interface Restaurant {
    id: string;
    name: string;
    address: string;
    horaire: string;
    description: string;
    contact: string;
    equipement: string;
  }

  const [errorMessage, setErrorMessage] = useState("") //Pour les messages d'erreurs
  const [nouveauRestaurant, setNouveauRestaurant] = useState("") // Pour créer un nouveau restaurant
  const [nouvelleAdresse, setNouvelleAdresse] = useState("") 
  const [restaurantList, setRestaurantList] = useState<Restaurant[]>([])
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const [restaurantModif, setRestaurantModif] = useState("")
  const [adresseModif, setAdresseModif] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [restaurantSelection, setRestaurantSelection] = useState("")
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)
  const [showModalAide, setShowModalAide] = useState(false)
  const [horaireModif, setHoraireModif] = useState("")
  const [nouveauHoraire, setNouveauHoraire] = useState("")
  const [descriptionModif, setDescriptionModif] = useState("")
  const [nouvelleDescription, setNouvelleDescription] = useState("")
  const [contactModif, setContactModif] = useState("")
  const [nouveauContact, setNouveauContact] = useState("")
  const [equipementModif, setEquipementModif] = useState("")
  const [nouvelEquipement, setNouvelEquipement] = useState("")
  const [showModalInfo, setShowModalInfo] = useState(false)
  const [restaurantInfo, setRestaurantInfo] = useState<Restaurant | null>(null)




  // Récuperer les données des restaurants dans la BDD
  useEffect(() => {
    Axios.get("/restaurant", { responseType: "json" }).then(response => {
      setRestaurantList(response.data)
    })
  }, []) 

  const handleShowConfirmationModal = (id : string) => {
    setShowConfirmationModal(true)
    setRestaurantSelection(id)
  }

  const handleShowInfo = (id: string) => {
    const selectedRestaurant = restaurantList.find(restaurant => restaurant.id === id)
    if (selectedRestaurant) {
      setShowModalInfo(true)
      setRestaurantInfo(selectedRestaurant)
    }
  }
  
    
  const handleEditClick = (id: string) => { //Afficher le modal de modification quand l'icone est cliquée
    setRestaurantSelection(id)
    setShowModal(true)
  }

  const handleHelpClick = () => {
    setShowModalAide(true)
  }

  const handleSaveClick = async (): Promise<void> => {
    try {
      if (restaurantSelection !== null) {
        // Trouver l'entrée de la FAQ correspondante
        const restaurantToUpdate = restaurantList.find((restaurant) => restaurant.id === restaurantSelection)
    
        if (restaurantToUpdate) {
          // Si on a trouvé l'élément à modifier
          const updatedRestaurant = {
            id: restaurantToUpdate.id,
            name: restaurantModif !== "" ? restaurantModif : restaurantToUpdate.name, // Remplace la question par la modification, sinon conserve la question initiale
            address: adresseModif !== "" ? adresseModif : restaurantToUpdate.address, // Remplace la réponse par la modification, sinon conserve la réponse initiale
            description : descriptionModif !== "" ? descriptionModif : restaurantToUpdate.description,
            horaire : horaireModif !== "" ? horaireModif : restaurantToUpdate.horaire,
            contact : contactModif !== "" ? contactModif : restaurantToUpdate.contact,
            equipement : equipementModif !== "" ? equipementModif : restaurantToUpdate.equipement,
          }
    
          // Effectuer la requête PATCH vers l'API pour mettre à jour la FAQ
          const response = await Axios.patch(`/restaurant/${restaurantSelection}`, updatedRestaurant)
    
          // Mettre à jour la liste des FAQ avec les données mises à jour
          const updatedList = restaurantList.map((restaurant) =>
            restaurant.id === restaurantSelection ? response.data : restaurant
          )
          setRestaurantList(updatedList)
          setAdresseModif("")
          setRestaurantModif("")
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
      description : nouvelleDescription,
      horaire : nouveauHoraire,
      contact : nouveauContact,
      equipement : nouvelEquipement,
    })
      .then((response) => {
        // Mettre à jour l'état faqList avec la nouvelle question
        setRestaurantList([...restaurantList, response.data])
        
        // Réinitialiser les états pour la nouvelle question et sa réponse
        setNouveauRestaurant("")
        setNouvelleAdresse("")
        setNouveauHoraire("")
        setNouvelleDescription("")
        setNouveauContact("")
        setNouvelEquipement("")
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
    
  // Supprimer un restaurant
  const handleDeleteRestaurant = async (): Promise<void> => {
    try {
      await Axios.delete(`/restaurant/${restaurantSelection}`)
      // Mettre à jour la liste des restaurants après la suppression
      const response = await Axios.get("/restaurant")
      setRestaurantList(response.data)
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
      <title>Editer les restaurants</title>
      <Navigation />

      <div className="center">
        <table className="mx-auto my-8 shadow-md"> 
          <thead>
            <tr>
              <th className="px-4 py-2">Les restaurants</th>
              <th className="px-4 py-2">Infos</th>
              <th className="px-4 py-2">Supprimer</th>
              <th className="px-4 py-2">Modifier</th>
            </tr>
          </thead>
          <tbody>
            {restaurantList.map((restaurant) => (
              <tr key={restaurant.id}>
                <td className="order-4 px-4 py-2 border border-black b">{restaurant.name}</td>
                <td className="order-4 px-4 py-2 border border-black text-center">
                  <div className="flex items-center justify-center">
                    <button onClick={() => handleShowInfo(restaurant.id)} className="btn btn-ghost btn-circle">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="8" cy="8" r="7" />
                        <line x1="8" y1="11" x2="8" y2="8" />
                        <line x1="8" y1="6" x2="8" y2="6" />
                      </svg>
                    </button>
                  </div>
                </td>

                <td className="order-4 px-4 py-2 border border-black b">
                  <button onClick={() => handleShowConfirmationModal(restaurant.id)} className="btn btn-ghost btn-circle">
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
                  <button onClick={() => handleEditClick(restaurant.id)} className="btn btn-ghost btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-edit" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                      <path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                      <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
                      <line x1="16" y1="5" x2="19" y2="8" />
                    </svg>
                  </button>
                </td>
                <div className="fixed z-20 flex items-center rounded-lg bottom-9 right-10">
                  <button  onClick={() => handleHelpClick()} className="ml-2 bg-blue-400 text-white font-medium text-xs px-6 py-2.5 rounded shadow-md hover:bg-blue-600 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center">
                    <HelpIcon className="mr-2" /> Besoin d'aide ?
                  </button>
                </div>
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
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Editer le nom du restaurant</h3>
                    <div className="mt-2">
                      <input type="text" placeholder="Nouveau nom" className="w-full max-w-xs input bg-gray-50 input-bordered" value={restaurantModif}
                        onChange={(e) => setRestaurantModif(e.target.value)}/>
                    </div>
                    <h3 className="mt-6 text-lg font-medium leading-6 text-gray-900">Editer l'adresse du restaurant</h3>
                    <div className="mt-2">
                      <input type="text" placeholder="Nouvelle adresse" className="w-full max-w-xs input bg-gray-50 input-bordered" value={adresseModif}
                        onChange={(e) => setAdresseModif(e.target.value)} />
                    </div>
                    <h3 className="mt-6 text-lg font-medium leading-6 text-gray-900">Editer les horaires du restaurant</h3>
                    <div className="mt-2">
                      <input type="text" placeholder="Nouveaux horaires" className="w-full max-w-xs input bg-gray-50 input-bordered" value={horaireModif}
                        onChange={(e) => setHoraireModif(e.target.value)} />
                    </div>
                    <h3 className="mt-6 text-lg font-medium leading-6 text-gray-900">Editer les informations de contact du restaurant</h3>
                    <div className="mt-2">
                      <input type="text" placeholder="Nouvelle adresse" className="w-full max-w-xs input bg-gray-50 input-bordered" value={contactModif}
                        onChange={(e) => setContactModif(e.target.value)} />
                    </div>
                    <h3 className="mt-6 text-lg font-medium leading-6 text-gray-900">Editer la description du restaurant</h3>
                    <div className="mt-2">
                      <input type="text" placeholder="Nouvelle adresse" className="w-full max-w-xs input bg-gray-50 input-bordered" value={descriptionModif}
                        onChange={(e) => setDescriptionModif(e.target.value)} />
                    </div>
                    <h3 className="mt-6 text-lg font-medium leading-6 text-gray-900">Editer les équipements du restaurant</h3>
                    <div className="mt-2">
                      <input type="text" placeholder="Nouvelle adresse" className="w-full max-w-xs input bg-gray-50 input-bordered" value={equipementModif}
                        onChange={(e) => setEquipementModif(e.target.value)} />
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
      {showModalInfo && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block w-full max-w-lg overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:p-6">
              {restaurantInfo ? (
                <div>
                  <h2 className="text-2xl font-bold mb-4">{restaurantInfo.name}</h2>
                  <div className="flex items-center mb-2">
                    <p>Adresse : {restaurantInfo.address}</p>
                  </div>
                  <div className="flex items-center mb-2">
                    <p>Horaires : {restaurantInfo.horaire}</p>
                  </div>
                  <div className="flex items-center mb-2">
                    <p>Description : {restaurantInfo.description}</p>
                  </div>
                  <div className="flex items-center">
                    <p>Contact : {restaurantInfo.contact}</p>
                  </div>
                  <div className="flex items-center mt-2">
                    <p>Équipements : {restaurantInfo.equipement}</p>
                  </div>
                </div>
              ) : (
                <div className="text-center">Pas de restaurant sélectionné</div>
              )}

              <div className="mt-6 flex justify-end">
                <button className="px-4 py-2 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:text-sm" onClick={() => setShowModalInfo(false)}>
            Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


      {showModalAide && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
                <p className="mt-4 text-gray-600">Cette page permet de visualiser tous les restaurants. <br /><br />
                  Vous pouvez ensuite soit ajouter un restaurant, en supprimer un ou modifier les informations d'un restaurant existant.</p>
              </div>
              <div className="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
                <button className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={() => setShowModalAide(false)}>
            Fermer
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
            <p className="m-4">Entrez les horaires du restaurant</p>
            <input type="text" placeholder="Horaires du restaurant" value={nouveauHoraire} onChange={(e) => setNouveauHoraire(e.target.value)} className="w-full max-w-xs input bg-gray-50 input-bordered" required/>
            <p className="m-4">Entrez les informations de contact du restaurant</p>
            <input type="text" placeholder="Contact du restaurant" value={nouveauContact} onChange={(e) => setNouveauContact(e.target.value)} className="w-full max-w-xs input bg-gray-50 input-bordered" required/>
            <p className="m-4">Entrez la description du restaurant</p>
            <input type="text" placeholder="Description du restaurant" value={nouvelleDescription} onChange={(e) => setNouvelleDescription(e.target.value)} className="w-full max-w-xs input bg-gray-50 input-bordered" required/>
            <p className="m-4">Entrez les équipements du restaurant</p>
            <input type="text" placeholder="Equipement du restaurant" value={nouvelEquipement} onChange={(e) => setNouvelEquipement(e.target.value)} className="w-full max-w-xs input bg-gray-50 input-bordered" required/>
              
            <button type="submit" className="m-8 bg-blue-400 border-blue-400 btn hover:bg-blue-600 btn-active">Valider</button>
            <br /><br />
          </div>         
        </form>
      </div>
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

      {showConfirmationModal && (
        <div id="deleteModal" tabIndex={-1} aria-hidden="true" className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="relative w-full max-w-md p-4">
            <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
              <button  onClick={() => setShowConfirmationModal(false)} type="button" className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="deleteModal">
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                <span className="sr-only">Close modal</span>
              </button>
              <svg className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
              <p className="mb-4 text-gray-500 dark:text-gray-300">Etes vous sûr de vouloir supprimer ce restaurant ? </p>
              <div className="flex items-center justify-center space-x-4">
                <button  onClick={() => setShowConfirmationModal(false)} data-modal-toggle="deleteModal" type="button" className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
          Annuler
                </button>
                <button  onClick={handleDeleteRestaurant} type="submit" className="px-3 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">
          Supprimer
                </button>
              </div>
            </div>
          </div>
        </div>

      )}

      <br/><br />
      <Footer />
    </div>
  )
}

export default EditerRestaurant