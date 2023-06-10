import Footer from "../../Footer/Footer"
import Navigation from "../../Navigation/Navigation"
import Axios from "../../../Axios"
import { useState, useEffect} from "react"
import HelpIcon from "@mui/icons-material/Help"

interface Contact {
    id: string;
    name: string;
    email: string;
    message: string;
    date: Date;
}

function EditerContact() {
  const [contactList, setContactList] = useState<Contact[]>([])
  const [errorMessage, setErrorMessage] = useState("")
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [contactSelection, setContactSelection] = useState("")
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)


  const handleEditClick = (id: string) => {
    setContactSelection(id)
    setShowModal(true)
  }

  const handleShowConfirmationModal = (id : string) => {
    setShowConfirmationModal(true)
    setContactSelection(id)
  }

  useEffect(() => {
    Axios.get("/contact")
      .then(response => {
        setContactList(response.data)
      })
  }, [])

  const handleDeleteContact = async (): Promise<void> => {
    try {
      await Axios.delete(`/contact/${contactSelection}`)
      // Mettre à jour la liste des menus après la suppression
      const response = await Axios.get("/contact")
      setContactList(response.data)
      setErrorMessage("")
      setShowSuccessAlert(true)
      setShowConfirmationModal(false)
    }  catch (error) {
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
      <Navigation />
      <title>Voir formulaire contact</title>
      <p className="py-8 text-4xl md:text-lg">Voir les formulaires de contact</p>
      <div className="center" >
        <table className="mx-auto my-8 shadow-md">
          <thead>
            <tr>
              <th className="px-4 py-2">Le nom</th>
              <th className="px-4 py-2">La date</th>
              <th className="px-4 py-2">L'email</th>
              <th className="px-4 py-2">Le message</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contactList.map((contact) => (
              <tr key={contact.id}>
                <td className="px-4 py-2 border border-black">{contact.name}</td>
                <td className="px-4 py-2 border border-black">{new Date(contact.date).toLocaleString("fr-FR")}</td>
                <td className="px-4 py-2 border border-black">{contact.email}</td>
                <td className="px-4 py-2 border border-black">{contact.message}</td>
                <td className="order-4 px-4 py-2 border border-black">
                  <button onClick={() => handleShowConfirmationModal(contact.id)} className="btn btn-ghost btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ff5722" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                      <line x1="4" y1="7" x2="20" y2="7" />
                      <line x1="10" y1="11" x2="10" y2="17" />
                      <line x1="14" y1="11" x2="14" y2="17" />
                      <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                      <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                    </svg>
                  </button>
                  <button onClick={() => window.location.href = `mailto:${encodeURIComponent(contact.email)}`} className="btn btn-ghost btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-mail-reply" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#00bcd4" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                      <line x1="5" y1="12" x2="13" y2="12" />
                      <line x1="5" y1="12" x2="9" y2="16" />
                      <line x1="5" y1="12" x2="9" y2="8" />
                    </svg>
                  </button>
                </td>
                <div className="fixed z-20 flex items-center rounded-lg bottom-9 right-10">
                  <button  onClick={() => handleEditClick(contact.id)} className="ml-2 bg-blue-400 text-white font-medium text-xs px-6 py-2.5 rounded shadow-md hover:bg-blue-600 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center">
                    <HelpIcon className="mr-2" /> Besoin d'aide ?
                  </button>
                </div>

              </tr>
              
            ))}
          </tbody>
        </table>
              
        {showSuccessAlert && (
          <div className="flex items-center justify-center w-1/2 mx-auto shadow-lg alert alert-success">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Le formulaire de contact a été supprimé avec succès !</span>
            </div>
          </div>
        )}
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
                  </div>
                  <p className="mt-4 text-gray-600">Cette page permet de visualiser tous les formulaires de contact. <br /><br />
                  Vous pouvez ensuite soit supprimer le formulaire ce qui enverra un mail à la personne, soit envoyer un mail de réponse à la personne grâce au bouton répondre.</p>
                </div>
                <div className="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={() => setShowModal(false)}>
            Fermer
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
                <p className="mb-4 text-gray-500 dark:text-gray-300">Etes vous sûr de vouloir supprimer ce forumulaire ? </p>
                <div className="flex items-center justify-center space-x-4">
                  <button  onClick={() => setShowConfirmationModal(false)} data-modal-toggle="deleteModal" type="button" className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
          Annuler
                  </button>
                  <button  onClick={handleDeleteContact} type="submit" className="px-3 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">
          Supprimer
                  </button>
                </div>
              </div>
            </div>
          </div>

        )}

      </div>
      <Footer />
    </div>
  )
}

export default EditerContact
