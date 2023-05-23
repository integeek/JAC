import Footer from "../../Footer/Footer"
import Navigation from "../../Navigation/Navigation"
import Axios from "../../../Axios"
import { useState, useEffect} from "react"

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


  useEffect(() => {
    Axios.get("/contact")
      .then(response => {
        setContactList(response.data)
      })
  }, [])

  const handleDeleteContact = async (id: string): Promise<void> => {
    try {
      await Axios.delete(`/contact/${id}`)
      // Mettre à jour la liste des menus après la suppression
      const response = await Axios.get("/contact")
      setContactList(response.data)
      setErrorMessage("")
      setShowSuccessAlert(true)
    } catch (error) {
      console.error(error)
      setErrorMessage("Une erreur est survenue lors de la suppression de la question.")
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
                  <button onClick={() => handleDeleteContact(contact.id)} className="btn btn-ghost btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ff5722" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                      <line x1="4" y1="7" x2="20" y2="7" />
                      <line x1="10" y1="11" x2="10" y2="17" />
                      <line x1="14" y1="11" x2="14" y2="17" />
                      <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                      <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                    </svg>
                  </button>
                  <button className="btn btn-ghost btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-mail-reply" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#00bcd4" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                      <line x1="5" y1="12" x2="13" y2="12" />
                      <line x1="5" y1="12" x2="9" y2="16" />
                      <line x1="5" y1="12" x2="9" y2="8" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
              
        {showSuccessAlert && (
          <div className="alert alert-success shadow-lg w-1/2 mx-auto flex justify-center items-center">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Le formulaire de contact a été supprimé avec succès !</span>
            </div>
          </div>
        )}

      </div>
      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
      <Footer />
    </div>
  )
}

export default EditerContact
