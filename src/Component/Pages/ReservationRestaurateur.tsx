import { useState, useEffect } from "react"
import Axios from "../../Axios"
import Navigation from "../Navigation/Navigation"
import Footer from "../Footer/Footer"
import moment from "moment"
import "moment/locale/fr"

function ReservationRestaurateur() {
  interface Reservation {
    id: string;
    commentaire: string;
    nbPersonne: number;
    menusId: string;
    menuName?: string;
    date?: Date
  }
  
  
  interface Menu {
    id: string;
    mainDish: string;
  }

  const [reservations, setReservations] = useState<Reservation[]>([])
  const [menus, setMenus] = useState<Menu[]>([])
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)
  const [reservationSelection, setReservationSelection] = useState("")
  const [errorMessage, setErrorMessage] = useState("") //Pour les messages d'erreurs
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)


  // Fonction pour récupérer le nom du menu associé à chaque réservation
  const getMenuName = (menusId: string) => {
    const menu = menus.find(menu => menu.id === menusId)
    return menu ? menu.mainDish : "Menu introuvable"
  }

  const handleShowConfirmationModal = (id : string) => {
    setShowConfirmationModal(true)
    setReservationSelection(id)
  }
  

  useEffect(() => {
    Axios.get("/reservation")
      .then((response) => {
        setReservations(response.data)
      })
      .catch((error) => {
        console.log(error)
      })

    Axios.get("/menus")
      .then((response) => {
        setMenus(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const handleDeleteMenus = async (): Promise<void> => {
    try {
      await Axios.delete(`/reservation/${reservationSelection}`)
      // Mettre à jour la liste des menus après la suppression
      const response = await Axios.get("/reservation")
      setReservations(response.data)
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

  return (
    <div className="flex flex-col h-screen">
      <title>Reservation restaurateur</title>
      <Navigation />
      <div className="flex-grow">
        <div className="px-4 mx-auto max-w-7xl">
          <h2 className="py-4 mb-4 text-3xl font-bold">Les réservations</h2>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left border-b-2 border-gray-300">
                    Client
                  </th>
                  <th className="px-4 py-2 text-left border-b-2 border-gray-300">
                    Date
                  </th>
                  <th className="px-4 py-2 text-left border-b-2 border-gray-300">
                    Nombre de personnes
                  </th>
                  <th className="px-4 py-2 text-left border-b-2 border-gray-300">
                    Menus
                  </th>
                  <th className="px-4 py-2 text-left border-b-2 border-gray-300">
                    Commentaire
                  </th>
                  <th className="px-4 py-2 text-left border-b-2 border-gray-300">
                    Supprimer
                  </th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((reservation) => (
                  <tr key={reservation.id}>
                    <td className="px-4 py-2 border-b border-gray-300">
                      {"nom du client"}
                    </td>
                    
                    <td className="px-4 py-2 border-b border-gray-300">
                      {reservation.date ? moment(reservation.date).locale("fr").format("DD/MM/YYYY") : ""}
                    </td>

                    <td className="px-4 py-2 border-b border-gray-300">
                      {reservation.nbPersonne}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-300">{getMenuName(reservation.menusId)}</td>
                    <td className="px-4 py-2 border-b border-gray-300">
                      {reservation.commentaire}
                    </td>
                    <td className="order-4 px-4 py-2 border border-black b">
                      <button onClick={() => handleShowConfirmationModal(reservation.id)} className="btn btn-ghost btn-circle">
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {showConfirmationModal && (
          <div id="deleteModal" tabIndex={-1} aria-hidden="true" className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="relative w-full max-w-md p-4">
              <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                <button  onClick={() => setShowConfirmationModal(false)} type="button" className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="deleteModal">
                  <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                  <span className="sr-only">Close modal</span>
                </button>
                <svg className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                <p className="mb-4 text-gray-500 dark:text-gray-300">Etes vous sûr de vouloir supprimer cette réservation ? </p>
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
              <span>La réservation a été supprimée avec succès !</span>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default ReservationRestaurateur
